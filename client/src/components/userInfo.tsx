import type { FC } from "react";
import { Avatar } from 'flowbite-react';

const userInfo: FC = function() {
  return (
    <Avatar img="/images/people/profile-picture-5.jpg" rounded>
      <div className="space-y-1 font-medium dark:text-white">
        <div>Jese Leos</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Joined in August 2014</div>
      </div>
    </Avatar>
  );
}

export default userInfo;
