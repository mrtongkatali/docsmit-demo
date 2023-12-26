export default function NavBar() {
    return (
        <div className="bg-gray-100">
            <nav className="bg-blue-500 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div>
                        <ul className="flex space-x-4">
                            <li><a href="/" className="text-white">Home</a></li>
                            <li><a href="/messages" className="text-white">Messages</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}