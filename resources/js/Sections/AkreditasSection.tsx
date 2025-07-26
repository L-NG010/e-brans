import { Users, Award, Trophy, LucideIcon } from "lucide-react";

interface AkreditasSectionType {
    text: string;
    icon: LucideIcon;
}
const AkreditasSection = () => {
    const content: AkreditasSectionType[] = [
        { text: "Akreditas A", icon: Users },
        { text: "2000+ Murid", icon: Award },
        { text: "10+ Jurusan", icon: Trophy },
    ];
    return (
        <>
            <div className="bg-[#0B2441] w-screen h-28 text-white flex items-center justify-center gap-72 font-bold text-xl">
                {content.map((item: AkreditasSectionType, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                        <item.icon size={18} />
                        <span>{item.text}</span>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AkreditasSection;
