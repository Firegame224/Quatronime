import Link from "next/link"

export default function NavbarDash() {
    const nav = [
        {
            href: "#",
            title: "Home"
        },
        {
            href: "#",
            title: "About"
        },
        {
            href: "#",
            title: "Contact"
        }
    ]
    
    return (
        <div className="flex items-center flex-col space-x-3 rtl:space-x-reverse">
            {nav.map((item , index)=> {
                return (
                    <Link href={item.href} key={index} className="text-white hover:text-gray-400">{item.title}</Link>
                )
            })}
        </div>
    )
}