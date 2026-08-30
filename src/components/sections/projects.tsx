"use client";
import React from "react";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogTrigger,
} from "../ui/responsive-dialog";
import { FloatingDock } from "../ui/floating-dock";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import projects, { Project } from "@/data/projects";
import { SectionHeader } from "./section-header";

import SectionWrapper from "../ui/section-wrapper";
import ScrollingPreview from "../scrolling-preview";

const ProjectsSection = () => {
  return (
    <SectionWrapper id="projects" className="max-w-6xl mx-auto md:min-h-[130vh] px-4 sm:px-6">
      <SectionHeader id="projects" title="Projects" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </SectionWrapper>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="flex items-center justify-center w-full">
      <ResponsiveDialog>
        <ResponsiveDialogTrigger className="bg-transparent flex justify-center w-full">
          <div
            className="group relative w-full h-auto rounded-xl overflow-hidden ring-1 ring-white/10 shadow-lg hover:ring-primary/40 transition-all duration-300 hover:scale-[1.02]"
            style={{ aspectRatio: "16/10" }}
          >
            {/* `src` can be any aspect ratio (tall pages pan, normal ones fit);
                the wallpaper is an optional /assets/backgrounds/<id>.jpg. */}
            <ScrollingPreview
              src={project.src}
              alt={project.title}
              bg={`/assets/backgrounds/${project.id}.jpg`}
            />
            <div className="absolute w-full h-28 bottom-0 left-0 bg-gradient-to-t from-background via-background/85 to-transparent pointer-events-none z-10">
              <div className="flex flex-col h-full items-start justify-end p-4 sm:p-5">
                <div className="text-base sm:text-lg font-semibold text-left [text-shadow:0_1px_4px_rgba(0,0,0,0.8)] line-clamp-1">
                  {project.title}
                </div>
                <div className="text-xs font-medium bg-primary text-primary-foreground rounded-md w-fit px-2.5 py-0.5 mt-1">
                  {project.category}
                </div>
              </div>
            </div>
          </div>
        </ResponsiveDialogTrigger>

        <ResponsiveDialogContent className="w-full md:max-w-4xl md:h-[85vh] md:!flex md:flex-col md:overflow-hidden md:p-0 md:gap-0">
          {/* Sticky header */}
          <div className="shrink-0 border-b border-border bg-background/80 backdrop-blur-sm px-4 sm:px-8 py-4 sm:py-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 min-w-0">
                <h4 className="font-display text-lg sm:text-2xl font-bold text-foreground tracking-tight truncate">
                  {project.title}
                </h4>
                <span className="w-fit shrink-0 text-[10px] sm:text-[11px] uppercase tracking-widest text-muted-foreground border border-border rounded-full px-2.5 py-0.5">
                  {project.category}
                </span>
              </div>
              <div className="shrink-0 flex items-center gap-3 self-end sm:self-auto">
                {project.github && project.github !== "#" && (
                  <Link
                    href={project.github}
                    target="_blank"
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
                  >
                    Source
                  </Link>
                )}
                {project.live && project.live !== "#" && (
                  <Link href={project.live} target="_blank">
                    <button className="group flex items-center gap-2 bg-primary text-primary-foreground text-xs sm:text-sm font-medium px-3.5 sm:px-4 py-1.5 rounded-full hover:bg-primary/80 transition-colors">
                      Visit
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Scrollable content */}
          <ScrollArea className="flex-1" type="always" data-lenis-prevent>
            <div className="px-4 sm:px-8 py-6 sm:py-8">
              {/* Tech stack */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex flex-col md:flex-row gap-6 md:gap-10 mb-8 sm:mb-10"
              >
                {project.skills.frontend?.length > 0 && (
                  <div className="flex flex-col items-start gap-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                      Tools &amp; Stack
                    </span>
                    <FloatingDock items={project.skills.frontend} />
                  </div>
                )}
                {project.skills.backend?.length > 0 && (
                  <div className="flex flex-col items-start gap-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                      Backend &amp; Infra
                    </span>
                    <FloatingDock items={project.skills.backend} />
                  </div>
                )}
              </motion.div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8 sm:mb-10" />

              {/* Project content */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {project.content}
              </motion.div>
            </div>
          </ScrollArea>

        </ResponsiveDialogContent>
      </ResponsiveDialog>
    </div>
  );
};

export default ProjectsSection;
