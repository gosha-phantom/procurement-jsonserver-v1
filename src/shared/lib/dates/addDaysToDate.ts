export function addDaysToDate(dt: Date, days: number): Date {
	const result = new Date(dt);
	result.setDate(result.getDate() + days);

	return result;
}
