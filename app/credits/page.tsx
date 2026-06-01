import Link from "next/link"

export default function creditsPage() {
    return (
        <main>
            <div className="flex flex-col">
                <ul>
                    <li>
                        Cross Icon by Font awesome on <Link href="https://icon-icons.com/authors/1183-font-awesome">Icon-Icons.com</Link>
                    </li>
                    <li>
                        Home hero image found on <Link href="https://catholiclibrary.org/art/?art=New_Testament_-_Other/7aeNM4rmgdzNLE81DxC6">catholiclibrary.org</Link>
                    </li>
                </ul>
            </div>
        </main>
    )
}