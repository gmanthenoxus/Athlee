'use client';

import React from 'react';
import { LiveMatchScreen } from '@/components/live/LiveMatchScreen';

type Params = Promise<{ id: string }>;

interface LiveMatchPageProps {
  params: Params;
}

export default function LiveMatchPage({ params }: LiveMatchPageProps) {
  const resolvedParams = React.use(params);

  return <LiveMatchScreen matchId={resolvedParams.id} />;
}
