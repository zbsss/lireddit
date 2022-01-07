import { withUrqlClient } from 'next-urql';
import Layout from '../components/Layout';
import { usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import NextLink from 'next/link';
import { Link } from '@chakra-ui/react';

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <Layout>
      <NextLink href='/create-post'>
        <Link>Create post</Link>
      </NextLink>
      {!data ? (
        <div>loading...</div>
      ) : (
        data.posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.text}</p>
          </div>
        ))
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
