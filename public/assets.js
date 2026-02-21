



export const categories = [
    {
        id: 1,
        name: "Public Health Insecticides",
        image: "/image/triangle-ball-pen  (1).jpg",
        slug: "/public-health-insecticides",
        },
    {
        id: 2,
        name: "Agricultural Weedicide",
        image: "/image/triangle-ball-pen  (2).jpg",
        slug: "/agricultural-weedicide", 
    },
    {
        id: 3,
        name: "Agricultural Insecticide",
        image: "/image/triangle-ball-pen  (3).jpg",
        slug: "/agricultural-insecticide", 
    },
    {
        id: 4,
        name: "Systemic Fungicides",
        image: "/image/triangle-ball-pen  (4).jpg",
        slug: "/systemic-fungicides", 
    },
    {
        id: 5,
        name: "Agricultural Herbicides",
        image: "/image/triangle-ball-pen  (5).jpg",
        slug: "/agricultural-herbicides",  
    },
]



export const products = [
    {
        id: 1,
        name: "Kinnfog Deltamethrin 1.25% ULV Public Health Insecticide",
        slug: "/kinnfog-deltamethrin-1-25-ulv-public-health-insecticide",   
        thumbImg: "/image/triangle-ball-pen  (1).jpg",
         galleryImg: [
            "/image/triangle-ball-pen  (1).jpg",
            "/image/triangle-ball-pen  (2).jpg",
            "/image/triangle-ball-pen  (3).jpg",
        ],
        price: "Rs. 1000",
        description: "Kinnfog Deltamethrin 1.25% ULV is a powerful insecticide designed for public health applications. It effectively controls a wide range of insect pests, including mosquitoes, flies, and other disease-carrying insects. With its high efficacy and long-lasting residual effect, Kinnfog Deltamethrin is an essential tool for vector control programs and public health initiatives.",
        shortDescription: "Powerful insecticide for public health applications, controlling mosquitoes, flies, and other disease-carrying insects.",
        category: ["1", "2", "3", "4", "5"],  
        MinimumOrderQuantity: "1000 Liters",
    },
    {
        id: 2,
        name: "Pretilachlor 50% EC Herbicides",
        slug: "/pretilachlor-50-ec-herbicides",
        thumbImg: "/image/triangle-ball-pen  (2).jpg",
        galleryImg: [
            "/image/triangle-ball-pen  (2).jpg",
            "/image/triangle-ball-pen  (3).jpg",
            "/image/triangle-ball-pen  (4).jpg",
        ],
        price: "Rs. 1500",
        description: "Pretilachlor 50% EC is a highly effective herbicide used for controlling a wide range of weeds in rice cultivation. It works by inhibiting the growth of weeds, allowing the rice plants to thrive and produce higher yields. With its broad-spectrum activity and long-lasting residual effect, Pretilachlor 50% EC is an essential tool for farmers looking to maximize their rice production.",
        shortDescription: "Highly effective herbicide for controlling weeds in rice cultivation, allowing rice plants to thrive and produce higher yields.",
        category: ["2", "5"],  
        MinimumOrderQuantity: "1000 Liters",
    },
    {
        id: 3,
        name: "Capcothion 50 Insecticide",
        slug: "/capcothion-50-insecticide",
        thumbImg: "/image/triangle-ball-pen  (3).jpg",
        galleryImg: [
            "/image/triangle-ball-pen  (3).jpg",
            "/image/triangle-ball-pen  (4).jpg",
            "/image/triangle-ball-pen  (5).jpg",
        ],
        price: "Rs. 2000",
        description: "Capcothion 50 is a highly effective insecticide designed for agricultural use. It provides excellent control of a wide range of insect pests, including aphids, whiteflies, and thrips. With its fast-acting formula and long-lasting residual effect, Capcothion 50 is an essential tool for farmers looking to protect their crops and maximize their yields.",
        shortDescription: "Highly effective insecticide for agricultural use, providing excellent control of a wide range of insect pests.",
        category: ["3", "4", "5"],  
        MinimumOrderQuantity: "1000 Liters",
    },
    {
        id: 4,
        name: "Carbendazim 12% Mancozeb 63% WP Systemic Contact Fungicide",
        slug: "/carbendazim-12-mancozeb-63-wp-systemic-contact-fungicide",
        thumbImg: "/image/triangle-ball-pen  (4).jpg",
        galleryImg: [
            "/image/triangle-ball-pen  (4).jpg",
            "/image/triangle-ball-pen  (5).jpg",
            "/image/triangle-ball-pen  (6).jpg",
        ],
        price: "Rs. 2500",  
        description: "Carbendazim 12% Mancozeb 63% WP is a powerful systemic contact fungicide designed for agricultural use. It provides excellent control of a wide range of fungal diseases, including powdery mildew, downy mildew, and leaf spot. With its fast-acting formula and long-lasting residual effect, Carbendazim 12% Mancozeb 63% WP is an essential tool for farmers looking to protect their crops and maximize their yields.",
        shortDescription: "Powerful systemic contact fungicide for agricultural use, providing excellent control of a wide range of fungal diseases.",
        category: ["4", "5"],  
        MinimumOrderQuantity: "1000 Liters",
    },  
    {
        id: 5,
        name: "Glyphosate 41 Sl Herbicide",
        slug: "/glyphosate-41-sl-herbicide",
        thumbImg: "/image/triangle-ball-pen  (5).jpg",
        galleryImg: [
            "/image/triangle-ball-pen  (5).jpg",
            "/image/triangle-ball-pen  (6).jpg",
            "/image/triangle-ball-pen  (7).jpg",
        ],
        price: "Rs. 3000",
        description: "Glyphosate 41 SL is a highly effective herbicide designed for agricultural use. It provides excellent control of a wide range of weeds, including grasses, broadleaf weeds, and woody plants. With its fast-acting formula and long-lasting residual effect, Glyphosate 41 SL is an essential tool for farmers looking to protect their crops and maximize their yields.",
        shortDescription: "Highly effective herbicide for agricultural use, providing excellent control of a wide range of weeds.",
        category: ["5", "1", "2", "3", "4"],  
        MinimumOrderQuantity: "1000 Liters",
    },
]