import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Flex, IconButton } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql';

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

const UpdootSection: FC<UpdootSectionProps> = ({ post }) => {
  const [loading, setLoading] = useState<'up-vote' | 'down-vote' | 'none'>(
    'none'
  );
  const [, vote] = useVoteMutation();

  return (
    <Flex direction='column' alignItems='center' justifyContent='center' mr={8}>
      <IconButton
        aria-label='up vote post'
        icon={<ChevronUpIcon />}
        isLoading={loading === 'up-vote'}
        onClick={async () => {
          if (post.voteStatus === 1) return;
          
          setLoading('up-vote');
          await vote({ value: 1, postId: post.id });
          setLoading('none');
        }}
        disabled={post.voteStatus === 1}
      />
      {post.points}
      <IconButton
        aria-label='down vote post'
        icon={<ChevronDownIcon />}
        isLoading={loading === 'down-vote'}
        onClick={async () => {
          if (post.voteStatus === -1) return;

          setLoading('down-vote');
          await vote({ value: -1, postId: post.id });
          setLoading('none');
        }}
        disabled={post.voteStatus === -1}
      />
    </Flex>
  );
};

export default UpdootSection;
