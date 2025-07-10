import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/sign-in");
    } else {
      console.error("Sign out failed:", error.message);
    }
  };

  return (
    <Button
      onClick={handleSignOut}
      variant="default"
      className="w-full max-w-full bg-orange-500 my-4 text-white hover:bg-orange-600 dark:bg-orange-400 dark:hover:bg-orange-500 font-semibold py-3 text-sm mx-auto block flex items-center justify-center"
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
