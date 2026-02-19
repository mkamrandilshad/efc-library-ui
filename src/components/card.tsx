import * as React from "react"

import { cn } from "@/lib/utils"

interface CardCreatorProps extends React.HTMLAttributes<HTMLDivElement> {
  creatorAvatar?: string;
  creatorTitle?: React.ReactNode;
  creatorSubtitle?: React.ReactNode;
  profileLinkId?: string;
  onProfileClick?: (id: string) => void;
  avatarComponent?: React.ComponentType<{ img?: string; className?: string }>;
  linkComponent?: React.ComponentType<{ to: string; className?: string; children: React.ReactNode }>;
}

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

const CardRow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex gap-4", className)}
    {...props}
  />
))
CardRow.displayName = "CardRow"

const CardCreator = React.forwardRef<HTMLDivElement, CardCreatorProps>(
  ({ className, creatorAvatar, creatorTitle, creatorSubtitle, profileLinkId, onProfileClick, avatarComponent: Avatar, linkComponent: Link, ...props }, ref) => {
    const DefaultAvatar = Avatar || (({ img, className: avatarClassName }: { img?: string; className?: string }) => 
      img ? <img src={img} alt="Avatar" className={cn("w-10 h-10 rounded-full", avatarClassName)} /> : <div className={cn("w-10 h-10 rounded-full bg-gray-300", avatarClassName)} />
    );
    
    const DefaultLink = Link || (({ to, className: linkClassName, children }: { to: string; className?: string; children: React.ReactNode }) => 
      <button onClick={() => onProfileClick?.(to)} className={cn("hover:underline font-semibold text-secondary-foreground", linkClassName)}>{children}</button>
    );

    return (
      <div ref={ref} className={cn("flex items-center", className)} {...props}>
        <DefaultAvatar img={creatorAvatar} />
        <div className="flex justify-start items-start flex-col ml-4">
          {profileLinkId ? (
            <DefaultLink
              to={profileLinkId}
              className="hover:underline font-semibold text-secondary-foreground"
            >
              {creatorTitle}
            </DefaultLink>
          ) : (
            creatorTitle && <div className="font-semibold text-foreground">{creatorTitle}</div>
          )}
          {creatorSubtitle && (
            <div className="text-muted-foreground print:h-0 overflow-hidden">{creatorSubtitle}</div>
          )}
        </div>
      </div>
    );
  }
);
CardCreator.displayName = "CardCreator";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, CardRow, CardCreator }
