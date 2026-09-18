/**
 * NAS-BAK Real Estate — listings data
 *
 * This is the ONLY file you need to touch to add, edit, or remove an
 * estate or a unit. js/main.js reads this array and builds the "Our
 * Estates" section and the contact form's "I'm interested in" dropdown
 * from it automatically — nothing else needs to change.
 *
 * TO ADD A NEW ESTATE: copy one whole { ... } block in the array below,
 * paste it before the closing "];", and edit its fields.
 *
 * TO REMOVE AN ESTATE: delete its whole { ... } block.
 *
 * TO ADD/REMOVE A UNIT: same idea, one level down, inside an estate's
 * "units" array.
 *
 * Field reference for each unit:
 *   type         e.g. "Semi-Detached Duplex"
 *   beds         e.g. "4 Bedroom" — set to "" if not specified for this unit
 *   sqm          e.g. "250 SQM"
 *   priceDisplay e.g. "₦30M" — shown on the card and in the enquiry dropdown
 *   image        path or URL to the unit's photo
 *   imageAlt     short description of the photo, for screen readers
 */

export const estateListings = [
  {
    name: "Hill View Estate",
    location: "Guzape 2",
    titleType: "FCDA C of O",
    units: [
      {
        type: "Semi-Detached Duplex Plot",
        beds: "4 Bedroom",
        sqm: "250 SQM",
        priceDisplay: "₦30M",
        image: "assets/images/semi-detached-duplex.jpg",
        imageAlt: "Semi-detached duplex exterior with private parking court, Hill View Estate",
      },
      {
        type: "Fully Detached Duplex + BQ plot",
        beds: "5 Bedroom",
        sqm: "500 SQM",
        priceDisplay: "₦60M",
        image: "assets/images/full-detached1.webp",
        imageAlt: "Fully detached duplex exterior with layered balconies, Hill View Estate",
      },
    ],
  },
  {
    name: "Dominion Villa",
    location: "Ketti Kabusa",
    titleType: "FCDA C of O",
    units: [
      {
        type: "Terrace Duplex Plot",
        beds: "3 Bedroom",
        sqm: "170 SQM",
        priceDisplay: "₦8.5M",
        image: "assets/images/semi-duplex.png",
        imageAlt: " Dominion Villa, 170 SQM terrace duplex",
      },
      {
        type: "Semi-Detached Duplex + BQ Plot",
        beds: "3 Bedroom",
        sqm: "250 SQM",
        priceDisplay: "₦12.5M",
        image: "assets/images/row-1-column-2.webp",
        imageAlt: " Dominion Villa, 250 SQM semi-detached duplex with BQ",
      },
      {
        type: "Fully Detached Duplex Plot",
        beds: "4 Bedroom",
        sqm: "400 SQM",
        priceDisplay: "₦20M",
        image: "assets/images/row-2-column-1.webp",
        imageAlt: " Dominion Villa, 400 SQM fully detached duplex",
      },
      {
        type: "Fully Detached Duplex + 2 Bedroom BQ Plot",
        beds: "5 Bedroom",
        sqm: "600 SQM",
        priceDisplay: "₦30M",
        image: "assets/images/row-2-column-2.webp",
        imageAlt: " Dominion Villa, 600 SQM fully detached duplex with 2-bedroom BQ",
      },
    ],
  },
  {
    name: "Hill Crest",
    location: "Katampe Extension",
    titleType: "FCDA C of O",
    units: [
      {
        type: "Semi Detached Duplex Plot",
        beds: "",
        sqm: "200 SQM",
        priceDisplay: "₦15.6M",
        image: "assets/images/semi-duplex.png",
        imageAlt: " Hill Crest, 200 SQM semi detached duplex",
      },
      {
        type: "Fully Detached Duplex Plot",
        beds: "",
        sqm: "250 SQM",
        priceDisplay: "₦19.7M",
        image: "assets/images/hill-crest-250.png",
        imageAlt: " Hill Crest, 250 SQM fully detached duplex",
      },
      {
        type: "Fully Detached Plot",
        beds: "",
        sqm: "400 SQM",
        priceDisplay: "₦33M",
        image: "assets/images/hill-crest-duplex.webp",
        imageAlt: " Hill Crest, 400 SQM fully detached unit",
      },
    ],
  },
  {
    name: "Glory Town Estate",
    location: "Karsana",
    titleType: "FCDA R of O",
    units: [
      {
        type: "Semi Detached Duplex Plot",
        beds: "4 Bedroom",
        sqm: "250 SQM",
        priceDisplay: "₦25M",
        image: "assets/images/glory-semi-250.webp",
        imageAlt: " Glory Town Estate, 250 SQM semi detached duplex",
      },
      {
        type: "Fully Detached Duplex + 2 Bedroom BQ Plot",
        beds: "5 Bedroom",
        sqm: "400 SQM",
        priceDisplay: "₦40M",
        image: "assets/images/400-plot.jpg",
        imageAlt: " Glory Town Estate, 400 SQM fully detached duplex with 2-bedroom BQ",
      },
      {
        type: "Fully Detached Duplex + 2 Bedroom BQ Plot",
        beds: "4 Bedroom",
        sqm: "600 SQM",
        priceDisplay: "₦60M",
        image: "assets/images/glory-plot.jpg",
        imageAlt: " Glory Town Estate, 600 SQM fully detached duplex with 2-bedroom BQ",
      },
    ],
  },
];
