"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Avatar from "@radix-ui/react-avatar";
import styles from './Login.module.css';
import clsx from "clsx";
import Link from "next/link";

export const LoginButtton: React.FC = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild className={clsx(styles.menuTrigger)}>
          <button className={styles.IconButton} aria-label="Customise options">
            <Avatar.Root className={styles.AvatarRoot}>
              {session.user?.image ? (
                <Avatar.Image
                  className={styles.AvatarImage}
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
          <DropdownMenu.Content className={clsx(styles.DropdownMenuContent)} sideOffset={5}>
            {"name" in session.user! && <DropdownMenu.Item className={styles.DropdownMenuItem} disabled>
              Signed in as {session.user.name}
            </DropdownMenu.Item>}

            <DropdownMenu.Item className={styles.DropdownMenuItem}>
              <Link href="/bookmarks">Bookmarks</Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item className={styles.DropdownMenuItem}>
              <button onClick={() => signOut()} className="w-100">Sign out</button>
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
