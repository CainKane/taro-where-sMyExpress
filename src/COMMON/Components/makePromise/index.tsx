/**
 *
 * @param callback
 * @param ifValueCanBeReplace
 */

declare namespace MakePromsie {
	export type main = <T extends {}>( callback: (resolve,reject) => any , onStatusChange : (status:status) => any ) => {
		promise: Promise<T|any> ,
		resolve: (value:any) => any,
		reject: (reason:any) => any ,
		getStatus : status ,
		
	};
	export type status =
		"pending"
		| "resolved"
		| "rejected";
	
}
export const makePromise : MakePromsie.main = <T extends {}>( callback:(resolve,reject) => any = () => null , onStatusChange = (status) => null ) => {
	let resolve , reject ;
	let status : MakePromsie.status = "pending";
	let currentPromise = new Promise<T | any>( ( $resolve , $reject ) => {
		
		resolve = (value) => {
			if(status === 'resolved') {
				currentPromise = Promise.resolve( value );
				return true;
			}else if(status === 'pending'){
				$resolve(value);
				status = 'resolved';
				onStatusChange?.(status);
				return undefined;
			}
		};
		
		reject = (rejectValue) => {
			if(status === 'rejected') {
				currentPromise = Promise.reject( rejectValue );
				return true;
			}else if(status === 'pending'){
				$reject(rejectValue);
				status = 'rejected';
				onStatusChange?.(status);
				return undefined;
			}
		};
		
		callback?.(
			resolve ,
			reject,
		);
	} );
	
	return new Proxy({} as ReturnType<MakePromsie.main>, {
		get( target , p: PropertyKey , receiver: any ): any {
			switch ( p ) {
				case "promise" : return currentPromise;break;
				case "resolve" : return resolve;break;
				case "reject" : return reject;break;
				case "status" : return status;break;
			}
		}
	});
};
