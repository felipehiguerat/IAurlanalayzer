import { Lead } from "@/lib/types";

export type PieData = {
    green: number;  // Hot leads
    yellow: number; // Neutral leads
    blue: number;   // Cold leads
};

export const calculatePieData = (leads: Lead[]): PieData => {
    const total = leads.length;

    if (!total) {
        // Return equal distribution when no leads
        return { green: 33.3, yellow: 33.3, blue: 33.4 };
    }

    // Match backend status values: "Hot", "Cold", "Neutral"
    const hotCount = leads.filter(
        lead => lead.status?.toLowerCase() === "hot"
    ).length;

    const neutralCount = leads.filter(
        lead => lead.status?.toLowerCase() === "neutral"
    ).length;

    const coldCount = leads.filter(
        lead => lead.status?.toLowerCase() === "cold"
    ).length;

    // Calculate percentages
    let hotPercent = (hotCount / total) * 100;
    let neutralPercent = (neutralCount / total) * 100;
    let coldPercent = (coldCount / total) * 100;

    // Round to 1 decimal
    hotPercent = Number(hotPercent.toFixed(1));
    neutralPercent = Number(neutralPercent.toFixed(1));
    coldPercent = Number(coldPercent.toFixed(1));

    // Ensure total is exactly 100% by adjusting the largest segment
    const sum = hotPercent + neutralPercent + coldPercent;
    if (sum !== 100) {
        const diff = Number((100 - sum).toFixed(1));
        // Add difference to the largest segment
        if (hotPercent >= neutralPercent && hotPercent >= coldPercent) {
            hotPercent = Number((hotPercent + diff).toFixed(1));
        } else if (neutralPercent >= hotPercent && neutralPercent >= coldPercent) {
            neutralPercent = Number((neutralPercent + diff).toFixed(1));
        } else {
            coldPercent = Number((coldPercent + diff).toFixed(1));
        }
    }

    return {
        green: hotPercent,
        yellow: neutralPercent,
        blue: coldPercent,
    };
};

