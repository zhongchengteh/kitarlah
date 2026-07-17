export const VISIT_BONUS = 5;

export const plasticRewardRates = [
  { code: "PET_01", label: "PET 01 - clear bottle", shortLabel: "PET bottle", rate: 10, accepted: true, guidance: "Empty, rinse and dry beverage bottles." },
  { code: "HDPE_02", label: "HDPE 02 - rigid container", shortLabel: "HDPE container", rate: 15, accepted: true, guidance: "Accepted when clean and separated." },
  { code: "PVC_03", label: "PVC 03 - rigid PVC", shortLabel: "PVC item", rate: 0, accepted: false, guidance: "Not accepted at this prototype booth. Check a specialist facility." },
  { code: "LDPE_04", label: "LDPE 04 - flexible plastic", shortLabel: "LDPE plastic", rate: 5, accepted: true, guidance: "Keep clean, dry and separate from other materials." },
  { code: "PP_05", label: "PP 05 - food container", shortLabel: "PP container", rate: 8, accepted: true, guidance: "Remove all food residue before depositing." },
  { code: "PS_06", label: "PS 06 - polystyrene", shortLabel: "Polystyrene", rate: 0, accepted: false, guidance: "Not accepted at this prototype booth." },
  { code: "OTHER_07", label: "Other 07 - mixed plastic", shortLabel: "Mixed plastic", rate: 2, accepted: true, guidance: "Acceptance depends on the booth inspection." },
  { code: "ANOMALY_TISSUE", label: "Tissue or napkin", shortLabel: "Tissue", rate: 0, accepted: false, guidance: "Tissues are not plastic recycling." },
  { code: "ANOMALY_BATT", label: "Household battery", shortLabel: "Battery", rate: 0, accepted: false, guidance: "Use a dedicated hazardous-waste collection point." },
];

export function getPlasticRate(code) {
  return plasticRewardRates.find((item) => item.code === code) || plasticRewardRates[0];
}

export function calculateSessionPoints(code, quantity) {
  const material = getPlasticRate(code);
  const cleanQuantity = Math.max(1, Number(quantity) || 1);
  const itemPoints = cleanQuantity * material.rate;
  return {
    material,
    quantity: cleanQuantity,
    itemPoints,
    visitBonus: material.accepted ? VISIT_BONUS : 0,
    total: material.accepted ? itemPoints + VISIT_BONUS : 0,
  };
}
