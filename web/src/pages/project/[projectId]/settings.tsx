import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import { SiOpenai } from "react-icons/si";
import Header from "@/src/components/layouts/header";
import { ApiKeyList } from "@/src/features/public-api/components/ApiKeyList";
import { Code, Bird, GraduationCap } from "lucide-react";
import { ProjectMembersTable } from "@/src/features/rbac/components/ProjectMembersTable";
import { DeleteProjectButton } from "@/src/features/projects/components/DeleteProjectButton";
import { HostNameProject } from "@/src/features/projects/components/HostNameProject";
import { ProjectUsageChart } from "@/src/features/usage-metering/ProjectUsageChart";
import { TransferOwnershipButton } from "@/src/features/projects/components/TransferOwnershipButton";
import RenameProject from "@/src/features/projects/components/RenameProject";
import { env } from "@/src/env.mjs";
import { Card } from "@tremor/react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { LlmApiKeyList } from "@/src/features/public-api/components/LLMApiKeyList";
import { PagedSettingsContainer } from "@/src/components/PagedSettingsContainer";
import { useQueryProject } from "@/src/features/projects/utils/useProject";

export default function SettingsPage() {
  const { project, organization } = useQueryProject();
  if (!project || !organization) return null;
  return (
    <div className="md:container">
      <Header title="Project Settings" />
      <PagedSettingsContainer
        pages={[
          {
            title: "General",
            content: (
              <div className="flex flex-col gap-10">
                <HostNameProject />
                <ProjectUsageChart projectId={project.id} />
                <RenameProject projectId={project.id} />
                <Instructions />
                <div className="space-y-3">
                  <DeleteProjectButton projectId={project.id} />
                  <TransferOwnershipButton projectId={project.id} />
                </div>
              </div>
            ),
          },
          {
            title: "API Keys",
            content: (
              <div className="flex flex-col gap-10">
                <ApiKeyList projectId={project.id} />
                <LlmApiKeyList projectId={project.id} />
              </div>
            ),
          },
          {
            title: "Members",
            content: <ProjectMembersTable projectId={project.id} />,
          },
          {
            title: "Integrations",
            content: <Integrations projectId={project.id} />,
          },
          {
            title: "Organization Settings",
            href: `/organization/${organization.id}/settings`,
          },
        ]}
      />
    </div>
  );
}

const instructionItems = [
  {
    name: "Introduction",
    description:
      "Understand the basics of langfuse: tracing and feedback collection",
    href: "https://langfuse.com/docs",
    icon: GraduationCap,
  },
  {
    name: "Quickstart",
    description: "Follow the quickstart to integrate langfuse into your app",
    href: "https://langfuse.com/docs/get-started",
    icon: RocketLaunchIcon,
  },
  {
    name: "OpenAI SDK Integration",
    description: "Trace your OpenAI API calls with a single line of code",
    href: "https://langfuse.com/docs/integrations/openai",
    icon: SiOpenai,
  },
  {
    name: "Langchain Integration",
    description:
      "Trace your Langchain llm/chain/agent/... with a single line of code",
    href: "https://langfuse.com/docs/integrations/langchain",
    icon: Bird,
  },
  {
    name: "LlamaIndex Integration",
    description:
      "Trace your Llamaindex RAG application by adding the global callback handler",
    href: "https://langfuse.com/docs/integrations/llama-index",
    icon: Code,
  },
  {
    name: "Typescript SDK",
    description: "npm install langfuse",
    href: "https://langfuse.com/docs/sdk/typescript",
    icon: Code,
  },
  {
    name: "Python SDK (Decorator)",
    description: "pip install langfuse",
    href: "https://langfuse.com/docs/sdk/python",
    icon: Code,
  },
  {
    name: "API Reference (Swagger)",
    description: "Custom integration",
    href: "https://langfuse.com/docs/reference",
    icon: Code,
  },
];

function Instructions() {
  return (
    <div>
      <Header title="Docs" level="h3" />
      <ul
        role="list"
        className="mt-6 divide-y divide-gray-200 border-b border-t border-gray-200"
      >
        {instructionItems.map((item, itemIdx) => (
          <li key={itemIdx}>
            <div className="group relative flex items-start space-x-3 py-4">
              <div className="flex-shrink-0">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600">
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-gray-900">
                  <a href={item.href} target="_blank" rel="noreferrer noopener">
                    <span className="absolute inset-0" aria-hidden="true" />
                    {item.name}
                  </a>
                </div>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <div className="flex-shrink-0 self-center">
                <ChevronRightIcon
                  className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const Integrations = (props: { projectId: string }) => {
  if (env.NEXT_PUBLIC_LANGFUSE_CLOUD_REGION === undefined) return null;

  return (
    <div>
      <Header title="Integrations" level="h3" />
      <Card className="p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/posthog-logo.svg"
          alt="Posthog Logo"
          className="mb-4 w-32"
        />
        <p className="mb-4 text-sm text-gray-700">
          We have teamed up with PostHog (OSS product analytics) to make
          Langfuse Events/Metrics available in your Posthog Dashboards.
        </p>
        <div className="flex items-center gap-2">
          <Button variant="secondary" asChild>
            <Link
              href={`/project/${props.projectId}/settings/posthog-integration`}
            >
              Configure
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="https://langfuse.com/docs/analytics/posthog">
              Integration Docs
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
};
