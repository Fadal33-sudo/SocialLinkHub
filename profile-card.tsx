import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { Profile } from "@shared/schema";

interface ProfileCardProps {
  profile: Profile;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-slate-700/50 shadow-2xl animate-float">
      <CardContent className="p-8">
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <Avatar className="w-24 h-24 border-4 border-indigo-500 dark:border-indigo-400 shadow-xl hover:scale-105 transition-transform duration-300">
            <AvatarImage src={profile.avatar} alt={profile.name} className="object-cover" />
            <AvatarFallback className="text-2xl font-bold bg-indigo-500 text-white">
              {profile.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Profile Info */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {profile.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-1">
            {profile.title}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            {profile.bio}
          </p>
          
          {/* Stats */}
          <div className="flex justify-center space-x-6 mb-6">
            <div className="text-center">
              <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                {formatNumber(profile.followers)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                {formatNumber(profile.following)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Following</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                {formatNumber(profile.likes)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Likes</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
