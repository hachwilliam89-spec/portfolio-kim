import Image from 'next/image';
import type { Project } from '@/lib/types';

export default function ProjectCover({ project }: { project: Project }) {
    if (project.imageKind === 'logo') {
        return (
            <div className="flex h-full w-full items-center justify-center bg-[#ecfdf5] p-8">
                <div className="relative aspect-[690/280] w-full max-w-sm overflow-hidden">
                    <Image
                        src={project.image}
                        alt={project.title}
                        width={1160}
                        height={280}
                        className="h-full w-[168.12%] max-w-none"
                    />
                </div>
            </div>
        );
    }

    return project.image ? (
        <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
    ) : (
        <div className="flex h-full items-center justify-center bg-gold/10 font-display text-4xl text-ink/50">
            {project.title}
        </div>
    );
}
