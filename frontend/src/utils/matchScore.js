/**
 * Calculates a match score (0-100) between a user profile and a franchise.
 */
export const calculateMatchScore = (user, franchise) => {
    if (!user || !franchise || user.role !== 'investor') return null;

    let score = 0;
    const weights = {
        capital: 50,
        land: 30,
        location: 20
    };

    // 1. Capital Match (50 points)
    if (user.capital >= franchise.investment) {
        score += weights.capital;
    } else if (user.capital >= franchise.investment * 0.7) {
        score += weights.capital * 0.6; // Partial match
    } else {
        score += (user.capital / franchise.investment) * weights.capital * 0.5;
    }

    // 2. Land Match (30 points)
    if (user.landArea >= franchise.land) {
        score += weights.land;
    } else if (user.landArea > 0) {
        score += (user.landArea / franchise.land) * weights.land;
    }

    // 3. Location Match (20 points)
    if (franchise.cities?.includes(user.city) || franchise.city === user.city) {
        score += weights.location;
    }

    return Math.min(Math.round(score), 100);
};

export const getScoreColor = (score) => {
    if (score >= 80) return "#10b981"; // Emerald
    if (score >= 50) return "#f59e0b"; // Amber
    return "#ef4444"; // Rose
};
