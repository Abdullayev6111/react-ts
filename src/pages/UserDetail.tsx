import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Container,
  Card,
  Avatar,
  Text,
  Group,
  Stack,
  Title,
  Badge,
  Anchor,
  Loader,
  Center,
  Button,
  Grid,
} from '@mantine/core';
import API from '../api/API';
import type { IUser } from '../types/user.type';

const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: user, isLoading } = useQuery<IUser>({
    queryKey: ['user', id],
    queryFn: () => API.get(`/users/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Center h={300}>
        <Loader size="lg" />
      </Center>
    );
  }

  if (!user) {
    return (
      <Center h={300}>
        <Text c="dimmed">User not found</Text>
      </Center>
    );
  }

  return (
    <Container size="sm" py="xl">
      <Card withBorder radius="lg" p="xl">
        <Stack align="center" gap="sm">
          <Avatar
            size={120}
            radius={120}
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
          />

          <Title order={2}>{user.name}</Title>
          <Text c="dimmed">@{user.username}</Text>

          {user.company?.name && (
            <Badge color="teal" variant="light">
              {user.company.name}
            </Badge>
          )}
        </Stack>

        <Grid mt="xl">
          <Grid.Col span={6}>
            <Text c="dimmed" size="sm">
              Email
            </Text>
            <Anchor href={`mailto:${user.email}`}>{user.email}</Anchor>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text c="dimmed" size="sm">
              Phone
            </Text>
            <Text>{user.phone}</Text>
          </Grid.Col>

          {user.website && (
            <Grid.Col span={6}>
              <Text c="dimmed" size="sm">
                Website
              </Text>
              <Anchor href={`https://${user.website}`} target="_blank">
                {user.website}
              </Anchor>
            </Grid.Col>
          )}

          {user.address?.city && (
            <Grid.Col span={6}>
              <Text c="dimmed" size="sm">
                City
              </Text>
              <Text>{user.address.city}</Text>
            </Grid.Col>
          )}
        </Grid>

        <Group mt="xl" justify="center">
          <Button variant="light" onClick={() => navigate(-1)}>
            Back
          </Button>
        </Group>
      </Card>
    </Container>
  );
};

export default UserDetail;
