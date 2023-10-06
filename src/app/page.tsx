import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Kanit } from "next/font/google";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { EnterIcon } from "@radix-ui/react-icons";
const kanit = Kanit({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
export default function Home() {
  const { userId } = auth();
  const isAuth = !!userId;
  return (
    <main className="w-screen min-h-screen bg-black text-white">
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
      >
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <span
              className={`mr-3 lg:text-6xl md:text-4xl text-2xl font-semibold ${kanit.className}`}
            >
              Talk to your PDF
            </span>
            <UserButton afterSignOutUrl="/" />
          </div>
          <div className="flex mt-2 p-3">
            {isAuth && <Button>Go to Chats</Button>}
          </div>
          <p className=" max-w-xl mt-1 text-sm text-slate-400/75 font-medium">
            Join a vast community of students, researchers, and professionals to
            promptly find answers to questions and gain insights from research
            using AI technology.
          </p>
          <div className="m-2">
            {isAuth ? (
              <h1>File Upload</h1>
            ) : (
              <Link href={"/sign-in"}>
                <Button>
                  Login to get started
                  <EnterIcon className="ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
