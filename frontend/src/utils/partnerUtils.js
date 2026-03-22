import { initialPools } from "../data/partnerData";

const STORAGE_KEY = "investment_pools";

export function getPools() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialPools));
        return initialPools;
    }
    return JSON.parse(stored);
}

export function joinPool(poolId, amount) {
    const pools = getPools();
    const updatedPools = pools.map(pool => {
        if (pool.id === poolId) {
            return {
                ...pool,
                currentCapital: pool.currentCapital + amount,
                membersCount: pool.membersCount + 1
            };
        }
        return pool;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPools));
    return updatedPools;
}

export function createPool(newPool) {
    const pools = getPools();
    const updatedPools = [...pools, {
        ...newPool,
        id: `pool_${Date.now()}`,
        currentCapital: 0,
        membersCount: 1,
        status: "Active"
    }];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPools));
    return updatedPools;
}
