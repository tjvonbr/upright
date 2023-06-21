"use client";

import { Dropdown } from "semantic-ui-react";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="h-[50px] px-2 border border-b-lightgray w-full absolute flex justify-between items-center top-0">
      <button>
        <span className="text-2xl">&#128200;</span>
      </button>
      <div className="mx-2 flex justify-center items-center">
        <Dropdown className="font-medium" text={session?.user?.name ?? ""}>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => signOut()} text="Sign Out" />
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
