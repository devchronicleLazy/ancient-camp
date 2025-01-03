import Link from 'next/link';

interface NavLinksProps {
    scrolled: boolean;
}

export default function NavLinks({ scrolled }: NavLinksProps) {
    return (
        <div className="hidden md:flex items-center space-x-6">
            {['Courses', 'Learn', 'Community'].map((item) => (
                <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className={`relative transition-all duration-500 ease-in-out group ${scrolled
                        ? 'text-primary-200 hover:text-primary-100'
                        : 'text-white/80 hover:text-white'
                        }`}
                >
                    {item}
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 ease-out rounded-full group-hover:w-full ${scrolled ? 'bg-primary-400' : 'bg-white'
                        }`} />
                </Link>
            ))}
        </div>
    );
}