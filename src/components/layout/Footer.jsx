export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400 text-center py-6 mt-auto">
            <p className="text-sm">
                © {new Date().getFullYear()}{" "}
                <span className="text-white font-semibold">DriveFleet</span> — All rights reserved.
            </p>
        </footer>
    );
}