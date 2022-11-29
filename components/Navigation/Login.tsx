"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Avatar from "@radix-ui/react-avatar";
import styles from './Login.module.css';
import clsx from "clsx";

export const LoginButtton: React.FC = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild className={clsx(styles.menuTrigger)}>
          <button aria-label="Customise options">
            <Avatar.Root className="AvatarRoot">
              {session.user?.image ? (
                <Avatar.Image
                  className="AvatarImage"
                  src={session?.user?.image}
                  alt="User Image"
                />
              ) : (
                <Avatar.Fallback className="AvatarFallback" delayMs={600}>
                  {session.user?.name
                    ?.split(" ")
                    .map((name: string) => name[0])
                    .join("")}
                </Avatar.Fallback>
              )}
            </Avatar.Root>
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className={clsx(styles.menuContent)} sideOffset={5}>
            <DropdownMenu.Item className="DropdownMenuItem">
              <button onClick={() => signOut()}>Sign out</button>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );
  }
  return (
    <div>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
};
