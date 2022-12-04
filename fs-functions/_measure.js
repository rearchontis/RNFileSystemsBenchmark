export function _measure(fn) {
    return async (...rest) => {
        const start = performance.now();
        
        const result = await fn(...rest); 
        
        const executionTime = performance.now() - start; 
        console.log('done in '+ executionTime.toFixed(3) + 'ms');
        
        return [result, executionTime];
    }
}