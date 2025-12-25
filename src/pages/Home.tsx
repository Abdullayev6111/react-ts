import { useQuery } from '@tanstack/react-query';
import {
  Center,
  Loader,
  Select,
  Group,
  Paper,
  Stack,
  Title,
  TextInput,
  ActionIcon,
  Tooltip,
  Text,
  Grid,
  Container,
  Flex,
  Table,
  Badge,
  Avatar,
  Anchor,
  ScrollArea,
} from '@mantine/core';
import { IconSearch, IconGrid3x3, IconList } from '@tabler/icons-react';
import { useState } from 'react';
import API from '../api/API';
import type { IUser } from '../types/user.type';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { data: users = [], isLoading } = useQuery<IUser[]>({
    queryKey: ['users'],
    queryFn: () =>
      API.get('/users').then((res) => {
        if (Array.isArray(res.data)) {
          return res.data;
        }
        return res.data.results || [];
      }),
  });

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [sortBy, setSortBy] = useState<'az' | 'za' | 'username'>('az');

  const filteredUsers = users
    .filter((user) => {
      const query = searchQuery.toLowerCase().trim();
      return (
        !query ||
        user.name.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.company?.name.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'az') return a.name.localeCompare(b.name);
      if (sortBy === 'za') return b.name.localeCompare(a.name);
      if (sortBy === 'username') return a.username.localeCompare(b.username);
      return 0;
    });

  const getJobTitle = (user: IUser) => user.company?.name || 'Freelancer';

  if (isLoading) {
    return (
      <Center my={100}>
        <Loader size="lg" color="teal" />
        <Text color="#d8a31c" ml={10}>
          Loading...
        </Text>
      </Center>
    );
  }

  if (!users.length) {
    return (
      <Center my={100}>
        <Text c="dimmed">User not found</Text>
      </Center>
    );
  }

  const tableRows = filteredUsers.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar
            size={40}
            radius={40}
            color="teal"
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/userDetail/${user.id}`)}
          ></Avatar>
          <div>
            <Text
              fz="sm"
              fw={500}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/userDetail/${user.id}`)}
            >
              {user.name}
            </Text>
            <Text
              fz="xs"
              c="dimmed"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/userDetail/${user.id}`)}
            >
              @{user.username}
            </Text>
          </div>
        </Group>
      </Table.Td>

      <Table.Td>
        <Badge
          color="#d8a31c"
          variant="outline"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate(`/userDetail/${user.id}`)}
        >
          {getJobTitle(user)}
        </Badge>
      </Table.Td>

      <Table.Td>
        <Anchor size="sm" href={`mailto:${user.email}`}>
          {user.email}
        </Anchor>
      </Table.Td>

      <Table.Td>
        <Text fz="sm">{user.phone}</Text>
      </Table.Td>

      <Table.Td>
        <Group gap={8} justify="flex-start">
          <Text>{user.address?.city}</Text>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Container size="xl" py="xl" pos="relative">
      <Title
        order={1}
        ta="center"
        mb="xl"
        style={{ color: '#d8a31c', fontWeight: 700, fontFamily: 'roboto', letterSpacing: '0.5px' }}
      >
        Users List
      </Title>

      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 4, lg: 3 }}>
          <Paper shadow="md" radius="lg" p="xl" withBorder h="fit-content" pos="sticky" top={20}>
            <Stack gap="lg">
              <Title order={4} ta="center" mb="md">
                Filters
              </Title>

              <Select
                label="Sorting"
                placeholder="Sorting by"
                value={sortBy}
                onChange={(value) => setSortBy((value as typeof sortBy) || 'az')}
                data={[
                  { value: 'az', label: 'By name (A→Z)' },
                  { value: 'za', label: 'By name (Z→A)' },
                  { value: 'username', label: 'By username' },
                ]}
              />
            </Stack>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 8, lg: 9 }}>
          <Flex direction="column" gap="xl">
            <Group justify="space-between" align="center">
              <TextInput
                placeholder="Search by name & username..."
                leftSection={<IconSearch size={18} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
                size="md"
                radius="xl"
                style={{ flex: 1, maxWidth: 500 }}
              />

              <Group gap="xs">
                <Tooltip label="Grid">
                  <ActionIcon
                    size="lg"
                    radius="md"
                    variant={viewMode === 'grid' ? 'filled' : 'light'}
                    color="teal"
                    onClick={() => setViewMode('grid')}
                  >
                    <IconGrid3x3 size={20} />
                  </ActionIcon>
                </Tooltip>

                <Tooltip label="List">
                  <ActionIcon
                    size="lg"
                    radius="md"
                    variant={viewMode === 'list' ? 'filled' : 'light'}
                    color="teal"
                    onClick={() => setViewMode('list')}
                  >
                    <IconList size={20} />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Group>

            {filteredUsers.length === 0 ? (
              <Center h={300}>
                <Text c="dimmed" size="xl">
                  Nothing not found
                </Text>
              </Center>
            ) : (
              <ScrollArea>
                <Table verticalSpacing="md" highlightOnHover={false}>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>User</Table.Th>
                      <Table.Th>Company</Table.Th>
                      <Table.Th>Email</Table.Th>
                      <Table.Th>Phone</Table.Th>
                      <Table.Th>Address City</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{tableRows}</Table.Tbody>
                </Table>
              </ScrollArea>
            )}
          </Flex>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Home;
