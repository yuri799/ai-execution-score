type ProfileBadgeProps = {
  profile: string;
  description?: string;
};

export function ProfileBadge({ profile, description }: ProfileBadgeProps) {
  return (
    <div className="flex flex-col justify-center rounded-xl border border-white/60 glass-card p-6 shadow-sm">
      <div className="inline-flex self-start rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 text-sm font-bold text-electric border border-blue-100/60">
        {profile}
      </div>
      {description ? <p className="mt-4 text-sm leading-6 text-slate-600">{description}</p> : null}
    </div>
  );
}
