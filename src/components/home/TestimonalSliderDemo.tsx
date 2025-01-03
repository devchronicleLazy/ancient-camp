import { FancyTestimonialsSlider } from "../eldoraui/testimonalslider";


const testimonials = [
    {
        img: "https://scontent.fsgn8-2.fna.fbcdn.net/v/t39.30808-1/315600797_1740322136349410_1687221667182479927_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHqy3X2vjij3hqMXJZR3YA1qBNBrkKps6aoE0GuQqmzpvc7Ppx7-acWD39xPq1SVruv14BGpDxJQqczUKwf1g96&_nc_ohc=J0c6dCAjH8MQ7kNvgH1rTrb&_nc_oc=AdizaHVsNQNloppI-h1casG2QyQT2r2J-hoaRD_DdjaK1UyQSVj8TYS27qahDGlEzHN-QDU4XcGfRkSGVHxoDpWN&_nc_zt=24&_nc_ht=scontent.fsgn8-2.fna&_nc_gid=A_g2yTwqBtpkQdLopOupT4r&oh=00_AYBoWB4jU5QUbvigWYawky06lNbFDFEKB-S7ule4-KXTMA&oe=676AB246",
        quote: "Ancient Chain's high performance and developer-friendly environment make it the perfect platform for building next-generation dApps. The learning platform helps developers master blockchain development efficiently.",
        name: "Tran Quan",
        role: "Smart Contract Developer"
    },
    {
        img: "https://scontent.fsgn8-2.fna.fbcdn.net/v/t39.30808-6/291653237_1638052633243028_8359446604325770541_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHfvWK5aBAqI90d7aGCCaa9PfFcs5Vymqs98VyzlXKaq2sklbTmngdiRrw_PtSBnkcAO3rDon8S2sQ1c74vd9IV&_nc_ohc=5kYlZbO-B9UQ7kNvgEZiuh-&_nc_oc=AdiWR7-REXOZUIqE0wXLl-KjQI-a1hfAMucVMRcUDMR_IG-iFniKfIt3KIEkNJ1kbEz5d7wMXl5SK5x-6XbVHd2z&_nc_zt=23&_nc_ht=scontent.fsgn8-2.fna&_nc_gid=ACSeomq5r3hqdvKo9Hx-UnR&oh=00_AYAMKC-W-4CIhXGbX-CaoK0xijxtwE3AkpwJhKRitk6M4g&oe=676A8DB7",
        quote: "The interactive learning experience and hands-on challenges make complex blockchain concepts easy to understand. Ancient's learning platform is revolutionizing blockchain education.",
        name: "Clément Hoang",
        role: "Frontend Developer"
    }
];

export default function Testimonials() {
    return (
        <div className="relative h-[500px] w-full overflow-hidden rounded-lg border bg-background">
            <div className="mt-[64px] px-12 flex justify-center">
                <FancyTestimonialsSlider testimonials={testimonials} />
            </div>
        </div>
    );
}