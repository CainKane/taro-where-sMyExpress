/**
 *
 * @param callback
 * @param ifValueCanBeReplace
 */

declare namespace MakePromsie {
	export type main = <T extends {}>( callback: (resolve,reject) => any , ifValueCanBeReplace: boolean ) => {
		promise: Promise<T> ,
		resolve: (value:any) => void,
		reject: (reason:any) => void ,
		getStatus : () => status ,
		
	};
	export type status =
		"pending"
		| "resolved"
		| "rejected";
	
}
export const makePromise : MakePromsie.main = <T extends {}>( callback:(resolve,reject) => any = () => null , ifValueCanBeReplace: boolean = false ) => {
	let resolve , reject ;
	let status : MakePromsie.status = "pending";
	const promise = new Promise<T>( ( $resolve , $reject ) => {
		resolve = $reject;
		reject = $reject;
		callback?.(
			resolve ,
			reject,
		);
	} );
	
	return {
		promise ,
		resolve : (value) => {
			resolve(value);
			status = "resolved";
		},
		reject : (reason) => {
			reject( reason );
			status = "rejected";
		},
		getStatus : () => status ,
	};
};

export const newMakePromise = () => {
	
	
	
	return new Proxy({},{
		get : (target , propKey , receiver) => {
		
		},
	})
};
