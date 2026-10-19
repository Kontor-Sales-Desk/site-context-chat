// OSM business categories for map discovery — one row per tag value.
// Sourced from OSM wiki tag lists (shop, amenity, office, craft, tourism, leisure,
// healthcare). Overpass has no "list categories" API; this static catalog is the
// practical full list users can search. IDs are `key:value` for exact Overpass filters.

export type OsmBusinessCategory = {
  /** Stable id sent to the API, e.g. `amenity:restaurant`. */
  id: string;
  key: string;
  value: string;
  /** Human label shown in the UI. */
  label: string;
  group: string;
};

function cat(key: string, value: string, label: string, group: string): OsmBusinessCategory {
  return { id: `${key}:${value}`, key, value, label, group };
}

/** Full searchable catalog (~200 common business-bearing OSM tags). */
export const OSM_BUSINESS_CATEGORIES: OsmBusinessCategory[] = [
  // ── Food & drink ──────────────────────────────────────────────────────────
  cat('amenity', 'restaurant', 'Restaurant', 'Food & drink'),
  cat('amenity', 'cafe', 'Café', 'Food & drink'),
  cat('amenity', 'bar', 'Bar', 'Food & drink'),
  cat('amenity', 'pub', 'Pub', 'Food & drink'),
  cat('amenity', 'fast_food', 'Fast food', 'Food & drink'),
  cat('amenity', 'food_court', 'Food court', 'Food & drink'),
  cat('amenity', 'ice_cream', 'Ice cream', 'Food & drink'),
  cat('amenity', 'biergarten', 'Beer garden', 'Food & drink'),
  cat('amenity', 'nightclub', 'Nightclub', 'Food & drink'),
  cat('shop', 'bakery', 'Bakery', 'Food & drink'),
  cat('shop', 'butcher', 'Butcher', 'Food & drink'),
  cat('shop', 'cheese', 'Cheese shop', 'Food & drink'),
  cat('shop', 'chocolate', 'Chocolate shop', 'Food & drink'),
  cat('shop', 'coffee', 'Coffee shop', 'Food & drink'),
  cat('shop', 'confectionery', 'Confectionery', 'Food & drink'),
  cat('shop', 'deli', 'Deli', 'Food & drink'),
  cat('shop', 'greengrocer', 'Greengrocer', 'Food & drink'),
  cat('shop', 'seafood', 'Seafood shop', 'Food & drink'),
  cat('shop', 'wine', 'Wine shop', 'Food & drink'),
  cat('shop', 'alcohol', 'Off licence / liquor', 'Food & drink'),
  cat('shop', 'tea', 'Tea shop', 'Food & drink'),
  cat('shop', 'pastry', 'Pastry shop', 'Food & drink'),
  cat('shop', 'water', 'Bottled water', 'Food & drink'),
  cat('shop', 'farm', 'Farm shop', 'Food & drink'),

  // ── Retail ────────────────────────────────────────────────────────────────
  cat('shop', 'supermarket', 'Supermarket', 'Retail'),
  cat('shop', 'convenience', 'Convenience store', 'Retail'),
  cat('shop', 'department_store', 'Department store', 'Retail'),
  cat('shop', 'mall', 'Shopping mall', 'Retail'),
  cat('shop', 'variety_store', 'Variety store', 'Retail'),
  cat('shop', 'clothes', 'Clothing store', 'Retail'),
  cat('shop', 'shoes', 'Shoe shop', 'Retail'),
  cat('shop', 'jewelry', 'Jewellery', 'Retail'),
  cat('shop', 'bag', 'Bag shop', 'Retail'),
  cat('shop', 'boutique', 'Boutique', 'Retail'),
  cat('shop', 'fabric', 'Fabric shop', 'Retail'),
  cat('shop', 'tailor', 'Tailor', 'Retail'),
  cat('shop', 'electronics', 'Electronics', 'Retail'),
  cat('shop', 'mobile_phone', 'Mobile phone shop', 'Retail'),
  cat('shop', 'computer', 'Computer shop', 'Retail'),
  cat('shop', 'appliance', 'Appliances', 'Retail'),
  cat('shop', 'furniture', 'Furniture', 'Retail'),
  cat('shop', 'houseware', 'Houseware', 'Retail'),
  cat('shop', 'kitchen', 'Kitchen supplies', 'Retail'),
  cat('shop', 'lighting', 'Lighting', 'Retail'),
  cat('shop', 'carpet', 'Carpet shop', 'Retail'),
  cat('shop', 'curtain', 'Curtains', 'Retail'),
  cat('shop', 'bed', 'Bedding', 'Retail'),
  cat('shop', 'hardware', 'Hardware store', 'Retail'),
  cat('shop', 'doityourself', 'DIY store', 'Retail'),
  cat('shop', 'paint', 'Paint shop', 'Retail'),
  cat('shop', 'tiles', 'Tiles', 'Retail'),
  cat('shop', 'garden_centre', 'Garden centre', 'Retail'),
  cat('shop', 'florist', 'Florist', 'Retail'),
  cat('shop', 'gift', 'Gift shop', 'Retail'),
  cat('shop', 'books', 'Bookshop', 'Retail'),
  cat('shop', 'stationery', 'Stationery', 'Retail'),
  cat('shop', 'newsagent', 'Newsagent', 'Retail'),
  cat('shop', 'toys', 'Toy shop', 'Retail'),
  cat('shop', 'sports', 'Sports shop', 'Retail'),
  cat('shop', 'outdoor', 'Outdoor equipment', 'Retail'),
  cat('shop', 'bicycle', 'Bicycle shop', 'Retail'),
  cat('shop', 'pet', 'Pet shop', 'Retail'),
  cat('shop', 'baby_goods', 'Baby goods', 'Retail'),
  cat('shop', 'cosmetics', 'Cosmetics', 'Retail'),
  cat('shop', 'perfumery', 'Perfumery', 'Retail'),
  cat('shop', 'beauty', 'Beauty supply', 'Retail'),
  cat('shop', 'hairdresser_supply', 'Hairdresser supply', 'Retail'),
  cat('shop', 'optician', 'Optician', 'Retail'),
  cat('shop', 'hearing_aids', 'Hearing aids', 'Retail'),
  cat('shop', 'medical_supply', 'Medical supply', 'Retail'),
  cat('shop', 'nutrition_supplements', 'Supplements', 'Retail'),
  cat('shop', 'herbalist', 'Herbalist', 'Retail'),
  cat('shop', 'art', 'Art shop', 'Retail'),
  cat('shop', 'music', 'Music shop', 'Retail'),
  cat('shop', 'video', 'Video / DVD', 'Retail'),
  cat('shop', 'video_games', 'Video games', 'Retail'),
  cat('shop', 'ticket', 'Ticket sales', 'Retail'),
  cat('shop', 'kiosk', 'Kiosk', 'Retail'),
  cat('shop', 'charity', 'Charity shop', 'Retail'),
  cat('shop', 'second_hand', 'Second hand', 'Retail'),
  cat('shop', 'pawnbroker', 'Pawnbroker', 'Retail'),
  cat('shop', 'antiques', 'Antiques', 'Retail'),
  cat('shop', 'trade', 'Trade supplies', 'Retail'),
  cat('shop', 'wholesale', 'Wholesale', 'Retail'),

  // ── Health & beauty ───────────────────────────────────────────────────────
  cat('amenity', 'pharmacy', 'Pharmacy', 'Health & beauty'),
  cat('amenity', 'clinic', 'Clinic', 'Health & beauty'),
  cat('amenity', 'doctors', "Doctor's surgery", 'Health & beauty'),
  cat('amenity', 'dentist', 'Dentist', 'Health & beauty'),
  cat('amenity', 'veterinary', 'Veterinary', 'Health & beauty'),
  cat('healthcare', 'clinic', 'Healthcare clinic', 'Health & beauty'),
  cat('healthcare', 'dentist', 'Dental clinic', 'Health & beauty'),
  cat('healthcare', 'physiotherapist', 'Physiotherapist', 'Health & beauty'),
  cat('healthcare', 'psychotherapist', 'Psychotherapist', 'Health & beauty'),
  cat('healthcare', 'laboratory', 'Medical laboratory', 'Health & beauty'),
  cat('shop', 'chemist', 'Chemist', 'Health & beauty'),
  cat('shop', 'hairdresser', 'Hairdresser', 'Health & beauty'),
  cat('shop', 'beauty', 'Beauty salon', 'Health & beauty'),
  cat('shop', 'massage', 'Massage', 'Health & beauty'),
  cat('shop', 'tattoo', 'Tattoo studio', 'Health & beauty'),
  cat('shop', 'laundry', 'Laundry', 'Health & beauty'),
  cat('shop', 'dry_cleaning', 'Dry cleaning', 'Health & beauty'),
  cat('leisure', 'spa', 'Spa', 'Health & beauty'),
  cat('leisure', 'fitness_centre', 'Gym / fitness centre', 'Health & beauty'),
  cat('leisure', 'sports_centre', 'Sports centre', 'Health & beauty'),
  cat('leisure', 'swimming_pool', 'Swimming pool', 'Health & beauty'),

  // ── Professional services ─────────────────────────────────────────────────
  cat('office', 'lawyer', 'Law firm', 'Professional services'),
  cat('office', 'accountant', 'Accountant', 'Professional services'),
  cat('office', 'estate_agent', 'Estate agent', 'Professional services'),
  cat('office', 'insurance', 'Insurance', 'Professional services'),
  cat('office', 'architect', 'Architect', 'Professional services'),
  cat('office', 'advertising_agency', 'Advertising agency', 'Professional services'),
  cat('office', 'employment_agency', 'Employment agency', 'Professional services'),
  cat('office', 'financial', 'Financial services', 'Professional services'),
  cat('office', 'financial_advisor', 'Financial advisor', 'Professional services'),
  cat('office', 'it', 'IT company', 'Professional services'),
  cat('office', 'consulting', 'Consulting', 'Professional services'),
  cat('office', 'engineer', 'Engineering office', 'Professional services'),
  cat('office', 'surveyor', 'Surveyor', 'Professional services'),
  cat('office', 'tax_advisor', 'Tax advisor', 'Professional services'),
  cat('office', 'notary', 'Notary', 'Professional services'),
  cat('office', 'company', 'Company office', 'Professional services'),
  cat('office', 'travel_agent', 'Travel agent', 'Professional services'),
  cat('office', 'educational_institution', 'Educational institution', 'Professional services'),
  cat('office', 'association', 'Association / NGO', 'Professional services'),
  cat('office', 'newspaper', 'Newspaper office', 'Professional services'),
  cat('office', 'research', 'Research office', 'Professional services'),
  cat('shop', 'travel_agency', 'Travel agency (shop)', 'Professional services'),
  cat('shop', 'estate_agent', 'Estate agent (shop)', 'Professional services'),
  cat('shop', 'copyshop', 'Copy shop', 'Professional services'),
  cat('shop', 'photo', 'Photo shop', 'Professional services'),
  cat('shop', 'printing', 'Print shop', 'Professional services'),

  // ── Automotive ────────────────────────────────────────────────────────────
  cat('shop', 'car', 'Car dealership', 'Automotive'),
  cat('shop', 'car_repair', 'Car repair', 'Automotive'),
  cat('shop', 'car_parts', 'Car parts', 'Automotive'),
  cat('shop', 'tyres', 'Tyre shop', 'Automotive'),
  cat('shop', 'motorcycle', 'Motorcycle dealer', 'Automotive'),
  cat('shop', 'motorcycle_repair', 'Motorcycle repair', 'Automotive'),
  cat('amenity', 'fuel', 'Petrol station', 'Automotive'),
  cat('amenity', 'charging_station', 'EV charging', 'Automotive'),
  cat('amenity', 'car_wash', 'Car wash', 'Automotive'),
  cat('amenity', 'car_rental', 'Car rental', 'Automotive'),
  cat('amenity', 'vehicle_inspection', 'Vehicle inspection', 'Automotive'),

  // ── Hospitality & venues ────────────────────────────────────────────────
  cat('tourism', 'hotel', 'Hotel', 'Hospitality'),
  cat('tourism', 'hostel', 'Hostel', 'Hospitality'),
  cat('tourism', 'guest_house', 'Guest house', 'Hospitality'),
  cat('tourism', 'motel', 'Motel', 'Hospitality'),
  cat('tourism', 'apartment', 'Holiday apartment', 'Hospitality'),
  cat('tourism', 'camp_site', 'Campsite', 'Hospitality'),
  cat('tourism', 'caravan_site', 'Caravan site', 'Hospitality'),
  cat('amenity', 'events_venue', 'Events venue', 'Hospitality'),
  cat('amenity', 'conference_centre', 'Conference centre', 'Hospitality'),
  cat('amenity', 'community_centre', 'Community centre', 'Hospitality'),
  cat('amenity', 'coworking_space', 'Coworking space', 'Hospitality'),
  cat('amenity', 'studio', 'Studio', 'Hospitality'),

  // ── Education & childcare ─────────────────────────────────────────────────
  cat('amenity', 'school', 'School', 'Education'),
  cat('amenity', 'college', 'College', 'Education'),
  cat('amenity', 'university', 'University', 'Education'),
  cat('amenity', 'kindergarten', 'Kindergarten', 'Education'),
  cat('amenity', 'childcare', 'Childcare', 'Education'),
  cat('amenity', 'language_school', 'Language school', 'Education'),
  cat('amenity', 'driving_school', 'Driving school', 'Education'),
  cat('amenity', 'music_school', 'Music school', 'Education'),
  cat('amenity', 'library', 'Library', 'Education'),

  // ── Finance & public-facing services ──────────────────────────────────────
  cat('amenity', 'bank', 'Bank', 'Finance & services'),
  cat('amenity', 'atm', 'ATM', 'Finance & services'),
  cat('amenity', 'bureau_de_change', 'Currency exchange', 'Finance & services'),
  cat('amenity', 'post_office', 'Post office', 'Finance & services'),
  cat('amenity', 'post_box', 'Post box', 'Finance & services'),

  // ── Entertainment & leisure ─────────────────────────────────────────────
  cat('amenity', 'cinema', 'Cinema', 'Entertainment'),
  cat('amenity', 'theatre', 'Theatre', 'Entertainment'),
  cat('amenity', 'arts_centre', 'Arts centre', 'Entertainment'),
  cat('amenity', 'casino', 'Casino', 'Entertainment'),
  cat('amenity', 'gambling', 'Gambling', 'Entertainment'),
  cat('leisure', 'bowling_alley', 'Bowling alley', 'Entertainment'),
  cat('leisure', 'amusement_arcade', 'Amusement arcade', 'Entertainment'),
  cat('leisure', 'escape_game', 'Escape room', 'Entertainment'),
  cat('leisure', 'miniature_golf', 'Mini golf', 'Entertainment'),

  // ── Craft & trades ────────────────────────────────────────────────────────
  cat('craft', 'plumber', 'Plumber', 'Craft & trades'),
  cat('craft', 'electrician', 'Electrician', 'Craft & trades'),
  cat('craft', 'carpenter', 'Carpenter', 'Craft & trades'),
  cat('craft', 'painter', 'Painter', 'Craft & trades'),
  cat('craft', 'roofer', 'Roofer', 'Craft & trades'),
  cat('craft', 'glaziery', 'Glazier', 'Craft & trades'),
  cat('craft', 'hvac', 'HVAC', 'Craft & trades'),
  cat('craft', 'locksmith', 'Locksmith', 'Craft & trades'),
  cat('craft', 'photographer', 'Photographer', 'Craft & trades'),
  cat('craft', 'shoemaker', 'Shoemaker', 'Craft & trades'),
  cat('craft', 'tailor', 'Tailor (craft)', 'Craft & trades'),
  cat('craft', 'window_construction', 'Window fitter', 'Craft & trades'),
  cat('shop', 'funeral_directors', 'Funeral directors', 'Craft & trades'),
];

const BY_ID = new Map(OSM_BUSINESS_CATEGORIES.map((c) => [c.id, c]));

export function getOsmCategory(id: string): OsmBusinessCategory | undefined {
  return BY_ID.get(id);
}

export function osmCategoryLabel(id: string): string {
  return getOsmCategory(id)?.label ?? id.replace(':', ' · ');
}

/** Match label, OSM value, group, or id — for the searchable picker. */
export function searchOsmCategories(query: string, limit = 40): OsmBusinessCategory[] {
  const q = query.trim().toLowerCase();
  if (!q) return OSM_BUSINESS_CATEGORIES.slice(0, limit);
  const out: OsmBusinessCategory[] = [];
  for (const c of OSM_BUSINESS_CATEGORIES) {
    if (
      c.label.toLowerCase().includes(q) ||
      c.value.replace(/_/g, ' ').includes(q) ||
      c.group.toLowerCase().includes(q) ||
      c.id.includes(q)
    ) {
      out.push(c);
      if (out.length >= limit) break;
    }
  }
  return out;
}

/** Legacy free-text chip → OSM id when possible. */
export function migrateCategoryId(saved: string): string {
  if (saved.includes(':')) return saved;
  const lower = saved.trim().toLowerCase();
  const exact = OSM_BUSINESS_CATEGORIES.find(
    (c) => c.label.toLowerCase() === lower || c.value === lower.replace(/\s+/g, '_'),
  );
  if (exact) return exact.id;
  const partial = OSM_BUSINESS_CATEGORIES.find(
    (c) => c.label.toLowerCase().includes(lower) || c.value.includes(lower.replace(/\s+/g, '_')),
  );
  return partial?.id ?? saved;
}

export function osmTagFilter(tag: OsmBusinessCategory): string {
  return `"${tag.key}"="${tag.value}"`;
}
