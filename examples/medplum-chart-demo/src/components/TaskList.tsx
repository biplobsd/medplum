import { Box, Text, Group, Card, Divider, Title } from '@mantine/core';
import { formatDateTime } from '@medplum/core';
import { Task, Resource } from '@medplum/fhirtypes';
import {
  CodeableConceptDisplay,
  Timeline,
  useResource,
  useMedplum,
  MedplumLink,
  ResourceAvatar,
  ResourceName,
  StatusBadge,
  ErrorBoundary,
  AttachmentDisplay,
} from '@medplum/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function TaskList(): JSX.Element | null {
  const { id } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const medplum = useMedplum();
  const patient = useResource({ reference: `Patient/${id}` });
  useEffect(() => {
    medplum.searchResources('Task', `patient=${id}`).then((response) => {
      setTasks(response);
    });
  });

  if (!patient) {
    return null;
  }
  return (
    <Card sx={{ width: 600 }} withBorder padding="sm" radius="md" mx="md" my="xl" shadow="xs">
      <Title>Required Action</Title>
      <Box>
        <Timeline>
          {tasks.map((task, idx) => (
            <>
              <FocusTimeline key={task.id} task={task} />
              {idx !== tasks.length - 1 ? <Divider /> : null}
            </>
          ))}
        </Timeline>
      </Box>
    </Card>
  );
}

function FocusTimeline(props: { task: Task }): JSX.Element | undefined {
  const task = props.task;

  const focusedResource = useResource(task.focus);
  if (!focusedResource) {
    return;
  }
  return (
    <TaskItem key={task.id} profile={task.owner} resource={focusedResource} task={task}>
      <Box pt="sm" px="xl" pb="xl">
        <TaskType resource={focusedResource} task={task} />
      </Box>
    </TaskItem>
  );
}

function TaskType(props: { resource: Resource; task: Task }): JSX.Element {
  const resource = props.resource;
  function renderResourceContent(resource: Resource) {
    switch (resource.resourceType) {
      case 'Communication':
        if (resource.topic) {
          return <CodeableConceptDisplay value={resource.topic} />;
        }
        return resource.payload?.[0].contentString ? (
          <Text>{resource.payload?.[0].contentString}</Text>
        ) : (
          <AttachmentDisplay value={resource.payload?.[0].contentAttachment} />
        );
      case 'MedicationRequest':
        return <CodeableConceptDisplay value={resource.medicationCodeableConcept} />;
      case 'Questionnaire':
        return <Text>{resource.name}</Text>;
      case 'DiagnosticReport':
        return <CodeableConceptDisplay value={resource.code} />;
      default:
        return <div />;
    }
  }

  if (!resource) {
    return <div />;
  }
  return <MedplumLink to={props.task}>{renderResourceContent(resource)}</MedplumLink>;
}

function TaskItem(props: any): JSX.Element {
  const { task, resource, profile, padding } = props;
  const author = profile ?? resource.meta?.author;
  const dateTime = props.dateTime ?? resource.meta?.lastUpdated;
  console.log(props.task.status);
  console.log(task.input[0].type)
  return (
    <>
      <Group position="apart" spacing={8} my="sm">
        <ResourceAvatar value={author} link={true} size="md" />
        <div style={{ flex: 1 }}>
          <Text size="sm">
            <ResourceName color="dark" weight={500} value={author} link={true} />
          </Text>
          {'status' in props.resource && (
            <Box mt={2} mb={2}>
              <StatusBadge status={task.status as string} />
            </Box>
          )}
          <Text size="xs">
            <MedplumLink color="dimmed" to={props.task}>
              {formatDateTime(dateTime)}
            </MedplumLink>
            <Text component="span" color="dimmed" mx={8}>
              &middot;
            </Text>
            <MedplumLink color="dimmed" to={props.resource}>
              <CodeableConceptDisplay value={task.input[0].type} />
            </MedplumLink>
          </Text>
        </div>
      </Group>
      <ErrorBoundary>
        {padding && <div style={{ padding: '0 16px 16px 16px' }}>{props.children}</div>}
        {!padding && <>{props.children}</>}
      </ErrorBoundary>
    </>
  );
}
