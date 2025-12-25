import { Button, Card, Group, Text } from '@mantine/core';
import classes from './UserCardImage.module.css';
import type { UserCardProps } from '../types/user.type';

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Card withBorder padding="xl" radius="md" className={classes.card} h="100%">
      <Text ta="center" fz="lg" fw={500} mt="sm">
        {user.name}
      </Text>

      <Text ta="center" fz="sm" c="dimmed">
        @{user.username}
      </Text>

      {user.company && (
        <Text ta="center" fz="xs" c="dimmed" mt={4}>
          {user.company.name}
        </Text>
      )}

      <Group mt="lg" justify="center" gap="xl">
        <div>
          <Text ta="center" fz="sm" c="dimmed">
            Email
          </Text>
          <Text ta="center" fz="sm" fw={500}>
            {user.email.toLowerCase()}
          </Text>
        </div>

        {user.phone && (
          <div>
            <Text ta="center" fz="sm" c="dimmed">
              Phone
            </Text>
            <Text ta="center" fz="sm" fw={500}>
              {user.phone}
            </Text>
          </div>
        )}
      </Group>

      <Button fullWidth radius="md" mt="xl" size="md" variant="default">
        Batafsil
      </Button>
    </Card>
  );
};

export default UserCard;
