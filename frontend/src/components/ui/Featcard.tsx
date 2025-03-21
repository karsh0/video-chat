import { LucideIcon, Lock, MessageSquareMore, ListVideo, ThumbsUp } from "lucide-react";

export function FeatCard({ title, desc, Icon }: { title: string; desc: string; Icon: LucideIcon }) {
    return (
        <div className="col-span-1 row-span-1">
            <div className="h-52 flex flex-col gap-2 p-4 border border-gray-600 rounded-2xl m-2 items-center text-center">
            <Icon size={32} className="text-blue-600" />
            <span className="font-semibold text-2xl">{title}</span>
            <p className="text-gray-400">{desc}</p>
        </div>
        </div>
    );
}
