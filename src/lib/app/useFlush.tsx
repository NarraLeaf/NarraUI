import React from "react";

export function useFlush(deps: React.DependencyList = []): [
    VoidFunction,
] {
    const [, flush] = React.useReducer((s) => s + 1, 0);
    
    React.useEffect(() => {
        flush();
    }, deps);

    return [flush];
}
