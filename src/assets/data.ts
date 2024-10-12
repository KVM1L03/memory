export interface Data {
    id: number;
    img_title: string;
    image: string;
}

export const imageData: Data[] = [
    {
        id: 1,
        img_title: 'Planet',
        image: "https://img.icons8.com/ios/50/FFFFFF/globe--v1.png"
    },
    {
        id: 2,
        img_title: 'Cloud',
        image: "https://img.icons8.com/ios-filled/50/FFFFFF/cloud.png",
    },
    {
        id: 3,
        img_title: 'Robot Arm',
        image: "https://img.icons8.com/external-yogi-aprelliyanto-glyph-yogi-aprelliyanto/50/FFFFFF/external-robot-arm-manufacturing-yogi-aprelliyanto-glyph-yogi-aprelliyanto.png" 
    },
    {
        id: 4,
        img_title: 'Robot',
        image: "https://img.icons8.com/ios-filled/50/FFFFFF/robot-2.png",
    },
    {
        id: 5,
        img_title: 'Processor',
        image: "https://img.icons8.com/ios-filled/50/FFFFFF/processor.png",
    },
    {
        id: 6,
        img_title: "Computer",
        image: "https://img.icons8.com/ios-filled/50/FFFFFF/workstation.png"
    },
    {
        id: 7,
        img_title: "Bug",
        image: "https://img.icons8.com/external-yogi-aprelliyanto-basic-outline-yogi-aprelliyanto/50/FFFFFF/external-malware-coding-and-programming-yogi-aprelliyanto-basic-outline-yogi-aprelliyanto.png" 
    },
    {
        id: 8,
        img_title: "Rocket",
        image: "https://img.icons8.com/ios-filled/50/FFFFFF/rocket.png" 
    },
    {
        id: 9,
        img_title: "Satellite",
        image: "https://img.icons8.com/external-smashingstocks-fill-lineal-smashing-stocks/50/FFFFFF/external-satelite-networking-smashingstocks-fill-lineal-smashing-stocks.png"
    },
    {
        id: 10,
        img_title: "Alien",
        image: "https://img.icons8.com/glyph-neue/64/FFFFFF/grey.png"
    }

    
];

// Function to preload images
export const preloadImages = () => {
    imageData.forEach((data) => {
        const img = new Image();
        img.src = data.image;
    });
};