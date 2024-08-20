const listingsubscriptionPrices = [
    {
        name: "Single Listing",
        id: "single_store",
        dynamic_product: false,
        priceIdentifierStripe: "price_1PIUnb1aEOmwlrqI6Bg2kFgN",
        priceIdentifierStripeTest: "price_1PIUnb1aEOmwlrqI6Bg2kFgN",
        route: {
            name: "stripe.listings.create.subscription",
            parameters: null,
        },
        price: "$16",
        priceRaw: "16",
        totalPrice: "16",
        frequencies: "per store / monthly",
        billed: "Billed every month",
        title: "Single listing",
        description: "Affordable & with all features.",
        features: [
            "Page Builder",
            "Up to 8000 dayly visitors",
            "Listing Directory",
            "Geolocation Technology",
            "Be Found Instantly By Consumers",
            "Responsive & Mobile-Friendly",
            "Showcase Listings and Products",
            "Be Where Your Customers Are",
            "Unlimited Availability",
        ],
        mostPopular: false,
    },
    {
        name: "Up to 3 listings",
        id: "three_listings",
        dynamic_product: true,
        minimum_quantity: 3,
        maximum_quantity: 3,
        priceIdentifierStripe: "price_1PIUp01aEOmwlrqICq8iRT3C",
        priceIdentifierStripeTest: "price_1PIUp01aEOmwlrqICq8iRT3C",
        route: {
            name: "stripe.listings.create.subscription",
            parameters: null,
        },
        price: "$14",
        priceRaw: "14",
        totalPrice: "42",
        frequencies: "per store / monthly",
        billed: "Billed every month",
        title: "Most popular",
        description: "Affordable & with all features.",
        features: [
            "Page Builder",
            "Up to 8000 dayly visitors",
            "Listing Directory",
            "Geolocation Technology",
            "Be Found Instantly By Consumers",
            "Responsive & Mobile-Friendly",
            "Showcase Listings and Products",
            "Be Where Your Customers Are",
            "Unlimited Availability",
        ],
        mostPopular: false,
    },
    {
        name: "From 4 listings",
        id: "dynamic_listings_enterprise",
        dynamic_product: true,
        minimum_quantity: 4,
        maximum_quantity: 1000,
        priceIdentifierStripe: "price_1PIUpm1aEOmwlrqIAtpM3ipd",
        priceIdentifierStripeTest: "price_1PIUpm1aEOmwlrqIAtpM3ipd",
        route: {
            name: "stripe.listings.create.subscription",
            parameters: [],
        },
        price: "$12",
        priceRaw: "12",
        totalPrice: "48",
        frequencies: "per store / monthly",
        billed: "Billed every month",
        title: "Enterprise",
        description: "A plan that scales with your business.",
        features: [
            "Page Builder",
            "Up to 8000 dayly visitors",
            "Listing Directory",
            "Geolocation Technology",
            "Be Found Instantly By Consumers",
            "Responsive & Mobile-Friendly",
            "Showcase Listings and Products",
            "Be Where Your Customers Are",
            "Unlimited Availability",
        ],
        mostPopular: true,
    },
];

export default listingsubscriptionPrices;