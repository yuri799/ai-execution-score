type ProfileBadgeProps = {
  profile: string;
  description?: string;
};

export function ProfileBadge({ profile, description }: ProfileBadgeProps) {
  return (
    <div className="rounded-lg border border-line bg-white p-5">
      <div className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-electric">{profile}</div>
      {description ? <p className="mt-4 text-sm leading-6 text-slate-600">{description}</p> : null}
    </div>
  );
}
