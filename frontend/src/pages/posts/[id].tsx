import { Box, Heading, Text } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import { usePostQuery } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';

const Post = () => {
  const router = useRouter();

  const intId =
    typeof router.query.id === 'string' ? parseInt(router.query.id) : -1;

  const [{ data, fetching, error }] = usePostQuery({
    pause: intId === -1,
    variables: {
      postId: intId,
    },
  });

  if (error) {
    return <>{error}</>;
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>Could not find post</Box>
      </Layout>
    );
  }

  return fetching ? (
    <div>Loading...</div>
  ) : (
    <Layout>
      <Heading mb={4}>{data.post.title}</Heading>
      <Text>{data.post.text}</Text>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
