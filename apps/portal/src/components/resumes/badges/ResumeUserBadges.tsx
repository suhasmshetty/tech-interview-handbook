import { trpc } from '~/utils/trpc';

import type { BadgePayload } from './resumeBadgeConstants';
import { RESUME_USER_BADGES } from './resumeBadgeConstants';
import ResumeUserBadge from './ResumeUserBadge';

type Props = Readonly<{
  userId: string;
}>;

export default function ResumeUserBadges({ userId }: Props) {
  const userReviewedResumeCountQuery = trpc.useQuery([
    'resumes.resume.findUserReviewedResumeCount',
    { userId },
  ]);
  const userMaxResumeUpvoteCountQuery = trpc.useQuery([
    'resumes.resume.findUserMaxResumeUpvoteCount',
    { userId },
  ]);

  // TODO: Add other badges in
  const payload: BadgePayload = {
    maxResumeUpvoteCount: userMaxResumeUpvoteCountQuery.data ?? 0,
    reviewedResumesCount: userReviewedResumeCountQuery.data ?? 0,
    topUpvotedCommentCount: 20,
  };

  return (
    <div className="flex items-center justify-center gap-1">
      {RESUME_USER_BADGES.filter((badge) => badge.isValid(payload)).map(
        (badge) => (
          <ResumeUserBadge
            key={badge.id}
            description={badge.description}
            icon={badge.icon}
            title={badge.title}
          />
        ),
      )}
    </div>
  );
}
