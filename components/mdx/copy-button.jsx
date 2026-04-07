"use client"

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Copy, } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/mdx/icons";

export const CopyPageButton = ({ doc }) => {
  const timeoutRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const getPageContent = () => `---\ntitle: ${doc.title}\ndescription: ${doc.description}\n---\n\n${doc.raw}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(getPageContent());
    setIsCopied(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const viewAsMdx = () => {
    const blob = new Blob([getPageContent()], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const openUrl = (url) => window.open(url, "_blank", "noopener,noreferrer");

  return (
    <ButtonGroup className='hidden md:flex'>
      <Button
        size="sm"
        variant="secondary"
        onClick={handleCopy}
        className='gap-2 border-r-0'
      >
        {isCopied ? <Check /> : <Copy />}
        Copy Page
      </Button>
      <div className="flex items-center bg-secondary w-px h-7 border-y border-background">
        <div className="bg-primary/10 w-px h-4"></div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon-sm"
            variant="secondary"
          >
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-fit min-w-34">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuItem onClick={viewAsMdx}>
              <Icons.markdown />
              View as MDX
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => openUrl(doc.githubUrl)}>
              <Icons.gitHub />
              Open on GitHub
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => openUrl(doc.historyUrl)}>
              <Icons.git />
              View History
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}