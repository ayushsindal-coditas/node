/**
 * Turns a numeric primary key into the display code shown in the UI
 * (e.g. id 42 -> "CDT-1042"). Computed on read instead of stored in the
 * database, so there's no extra column and no risk of it going stale.
 */
export const formatEmployeeCode = (id: number): string => `CDT-${1000 + id}`;
