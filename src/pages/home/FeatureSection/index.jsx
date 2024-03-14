import AnimatedLink from "../../../components/common/AnimatedLink";
function FeatureSection() {
    const features = [
        {
            icon: "lightning",
            title: "Lightning-Fast URL Shortening",
            subtext: "Instantly shorten lengthy URLs with a single click, enhancing efficiency and saving time."
        },
        {
            icon: "link",
            title: "Customizable Short Links",
            subtext: "Tailor your short links with personalized slugs to make them memorable and on-brand."
        },
        {
            icon: "graph",
            title: "Detailed Analytics",
            subtext: "Gain insights into link performance with comprehensive analytics, tracking clicks, geographic data, and more."
        },
        {
            icon: "QR",
            title: "QR Code Generation",
            subtext: "Generate QR codes for your shortened links, perfect for offline promotion and mobile engagement."
        },
        {
            icon: "lock",
            title: "Secure Linking",
            subtext: "Priority on security with HTTPS support, ensuring safe and reliable link redirection."
        },
        {
            icon: "smile",
            title: "User-Friendly Dashboard",
            subtext: "Intuitive and easy-to-navigate dashboard for managing, editing, and tracking your shortened URLs."
        },
        {
            icon: "bulk",
            title: "Bulk Link Shortening",
            subtext: "Save time by shortening multiple links at once, ideal for campaigns, events, or extensive content."
        },
        {
            icon: "server",
            title: "API Integration",
            subtext: "Seamlessly integrate Quick Linker into your applications, websites, or services using our developer-friendly API."
        },
        {
            icon: "bin",
            title: "Link Expiry and Deactivation",
            subtext: "Set expiration dates for links or deactivate them at any time, providing control and flexibility."
        },
        {
            icon: "browser",
            title: "Password-Protected Links",
            subtext: "Add an extra layer of security by password-protecting sensitive links."
        },
        {
            icon: "key",
            title: "Password-Protected Links",
            subtext: "Add an extra layer of security by password-protecting sensitive links."
        },
        {
            icon: "doc",
            title: "Support and Documentation",
            subtext: "Access a robust support system and documentation to assist you in maximizing the potential of Quick Linker."
        },
    ]
    return (
        <section className="px-16 py-16 flex flex-col items-center">
            <header>
                <h1 className="text-dark-800 font-semibold text-5xl flex">
                    Our&nbsp;
                    <span className="text-primary overflow-hidden">
                        <AnimatedLink
                        title='Features'
                        isLink={false}
                        />
                    </span> 
                </h1>
            </header>
        </section>
    );
}

export default FeatureSection;