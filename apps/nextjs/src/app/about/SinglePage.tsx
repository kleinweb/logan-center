'use client'

import Separator from '@atoms/Separator'
import PageHeader from '@organisms/Page/Header'
import PostBody from '@organisms/PostBody'
import Container from '@templates/Container'
import Layout from '@templates/Layout'

export interface SinglePageProps {
  title: string
  content: string
}

export default function SinglePage({title, content}: SinglePageProps) {
  return (
    <Layout>
      <Container>
        <article>
          <PageHeader title={title} />
          <PostBody content={content} />
        </article>
        <Separator />
      </Container>
    </Layout>
  )
}
