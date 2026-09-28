export const reverseGeocode = async (latitude, longitude) => {
  if (typeof latitude !== "number" || typeof longitude !== "number") {
    return { country: null, state: null, district: null, area: null, city: null };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
      {
        headers: {
          "User-Agent": "RungtaStudentXchange/1.0 (student marketplace visitor analytics)",
        },
        signal: controller.signal,
      }
    );

    clearTimeout(timeout);

    if (!response.ok) {
      return { country: null, state: null, district: null, area: null, city: null };
    }

    const data = await response.json();
    const address = data?.address || {};

    return {
      country: address.country || null,
      state: address.state || null,
      // "District" — the admin level between state and city (e.g.
      // Indian revenue districts).
      district: address.state_district || address.county || null,
      // "Area" — neighbourhood-level, the finest label worth showing
      // on the map.
      area: address.suburb || address.neighbourhood || address.city_district || null,
      city: address.city || address.town || address.village || address.county || null,
    };
  } catch (error) {
    return { country: null, state: null, district: null, area: null, city: null };
  }
};
