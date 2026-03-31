"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SITE_DOMAIN } from "@/lib/constants";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Edit, Plus, X, Building2, Briefcase, ChevronDown, ChevronRight } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface JobOrganization {
  id: string;
  name: string;
  logo_url: string | null;
  description: string | null;
  website_url: string | null;
  created_at: string;
}

interface JobOpening {
  id: string;
  organization_id: string | null;
  role: string;
  department: string;
  location: string;
  employment_type: 'full_time' | 'part_time' | 'internship';
  description: string;
  published: boolean;
  slug: string | null;
  created_at: string;
}

// Helper function to generate slug from role
const generateSlug = (role: string): string => {
  return role
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

const CareersCMS = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // View mode: 'list' | 'org-form' | 'job-form'
  const [viewMode, setViewMode] = useState<'list' | 'org-form' | 'job-form'>('list');
  
  // Organization form state
  const [editingOrgId, setEditingOrgId] = useState<string | null>(null);
  const [orgName, setOrgName] = useState("");
  const [orgLogoUrl, setOrgLogoUrl] = useState("");
  const [orgDescription, setOrgDescription] = useState("");
  const [orgWebsiteUrl, setOrgWebsiteUrl] = useState("");
  const [uploadingOrgLogo, setUploadingOrgLogo] = useState(false);

  // Job form state
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [jobOrgId, setJobOrgId] = useState<string | null>(null);
  const [jobRole, setJobRole] = useState("");
  const [jobSlug, setJobSlug] = useState("");
  const [jobDepartment, setJobDepartment] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobEmploymentType, setJobEmploymentType] = useState<'full_time' | 'part_time' | 'internship'>('full_time');
  const [jobDescription, setJobDescription] = useState("");
  const [jobPublished, setJobPublished] = useState(false);
  
  // For the initial question when adding job
  const [isPartnerJob, setIsPartnerJob] = useState<boolean | null>(null);
  
  // Collapsible state for organizations
  const [expandedOrgs, setExpandedOrgs] = useState<Set<string>>(new Set());

  // Fetch organizations
  const { data: organizations, isLoading: orgsLoading } = useQuery({
    queryKey: ["admin-job-organizations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("job_organizations")
        .select("*")
        .order("name", { ascending: true });

      if (error) throw error;
      return data as JobOrganization[];
    },
  });

  // Fetch job openings
  const { data: jobOpenings, isLoading: jobsLoading } = useQuery({
    queryKey: ["admin-job-openings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("job_openings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as JobOpening[];
    },
  });

  // Delete organization mutation
  const deleteOrgMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("job_organizations").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-job-organizations"] });
      queryClient.invalidateQueries({ queryKey: ["admin-job-openings"] });
      toast({ title: "Success", description: "Organization deleted successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Save organization mutation
  const saveOrgMutation = useMutation({
    mutationFn: async () => {
      const orgData = {
        name: orgName,
        logo_url: orgLogoUrl || null,
        description: orgDescription || null,
        website_url: orgWebsiteUrl || null,
      };

      if (editingOrgId) {
        const { error } = await supabase
          .from("job_organizations")
          .update(orgData)
          .eq("id", editingOrgId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("job_organizations").insert(orgData);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-job-organizations"] });
      toast({
        title: "Success",
        description: editingOrgId ? "Organization updated successfully" : "Organization created successfully",
      });
      resetOrgForm();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Delete job mutation
  const deleteJobMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("job_openings").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-job-openings"] });
      toast({ title: "Success", description: "Job opening deleted successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Save job mutation
  const saveJobMutation = useMutation({
    mutationFn: async () => {
      const jobData = {
        organization_id: jobOrgId,
        role: jobRole,
        slug: jobSlug || generateSlug(jobRole),
        department: jobDepartment,
        location: jobLocation,
        employment_type: jobEmploymentType,
        description: jobDescription,
        published: jobPublished,
      };

      if (editingJobId) {
        const { error } = await supabase
          .from("job_openings")
          .update(jobData)
          .eq("id", editingJobId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("job_openings").insert(jobData);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-job-openings"] });
      toast({
        title: "Success",
        description: editingJobId ? "Job opening updated successfully" : "Job opening created successfully",
      });
      resetJobForm();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const handleOrgLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingOrgLogo(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `org-logo-${Date.now()}.${fileExt}`;
      const filePath = `organizations/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      setOrgLogoUrl(publicUrl);
      toast({ title: "Success", description: "Logo uploaded successfully" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setUploadingOrgLogo(false);
    }
  };

  const resetOrgForm = () => {
    setEditingOrgId(null);
    setOrgName("");
    setOrgLogoUrl("");
    setOrgDescription("");
    setOrgWebsiteUrl("");
    setViewMode('list');
  };

  const resetJobForm = () => {
    setEditingJobId(null);
    setJobOrgId(null);
    setJobRole("");
    setJobSlug("");
    setJobDepartment("");
    setJobLocation("");
    setJobEmploymentType('full_time');
    setJobDescription("");
    setJobPublished(false);
    setIsPartnerJob(null);
    setViewMode('list');
  };

  const handleEditOrg = (org: JobOrganization) => {
    setEditingOrgId(org.id);
    setOrgName(org.name);
    setOrgLogoUrl(org.logo_url || "");
    setOrgDescription(org.description || "");
    setOrgWebsiteUrl(org.website_url || "");
    setViewMode('org-form');
  };

  const handleEditJob = (job: JobOpening) => {
    setEditingJobId(job.id);
    setJobOrgId(job.organization_id);
    setJobRole(job.role);
    setJobSlug(job.slug || "");
    setJobDepartment(job.department);
    setJobLocation(job.location);
    setJobEmploymentType(job.employment_type);
    setJobDescription(job.description);
    setJobPublished(job.published);
    setIsPartnerJob(!!job.organization_id);
    setViewMode('job-form');
  };

  const handleAddNewJob = () => {
    resetJobForm();
    setViewMode('job-form');
  };

  const handleAddNewOrg = () => {
    resetOrgForm();
    setViewMode('org-form');
  };

  const toggleOrgExpanded = (orgId: string) => {
    setExpandedOrgs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(orgId)) {
        newSet.delete(orgId);
      } else {
        newSet.add(orgId);
      }
      return newSet;
    });
  };

  const getEmploymentTypeLabel = (type: string) => {
    switch (type) {
      case 'full_time': return 'Full-time';
      case 'part_time': return 'Part-time';
      case 'internship': return 'Internship';
      default: return type;
    }
  };

  // Group jobs by organization
  const qapilotJobs = jobOpenings?.filter(job => !job.organization_id) || [];
  const orgJobsMap = new Map<string, JobOpening[]>();
  
  organizations?.forEach(org => {
    const jobs = jobOpenings?.filter(job => job.organization_id === org.id) || [];
    orgJobsMap.set(org.id, jobs);
  });

  if (orgsLoading || jobsLoading) {
    return (
      <div className="py-8 text-center text-muted-foreground">Loading…</div>
    );
  }

  // Job form - initial question
  if (viewMode === 'job-form' && isPartnerJob === null && !editingJobId) {
    return (
      <Card className="border border-border bg-card text-card-foreground shadow-sm">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
              Add new job opening
            </h2>
            <Button variant="ghost" size="icon" onClick={resetJobForm}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="text-center py-8 space-y-6">
            <h3 className="text-lg font-medium">Is this job opening in association with a partner organization?</h3>
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                className="w-40 h-24 flex flex-col gap-2"
                onClick={() => setIsPartnerJob(true)}
              >
                <Building2 className="w-8 h-8" />
                <span>Yes, Partner Job</span>
              </Button>
              <Button
                variant="outline"
                className="w-40 h-24 flex flex-col gap-2"
                onClick={() => {
                  setIsPartnerJob(false);
                  setJobOrgId(null);
                }}
              >
                <Briefcase className="w-8 h-8" />
                <span>No, QAPilot Job</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Job form - select organization (for partner jobs)
  if (viewMode === 'job-form' && isPartnerJob === true && !jobOrgId && !editingJobId) {
    return (
      <Card className="border border-border bg-card text-card-foreground shadow-sm">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
              Select partner organization
            </h2>
            <Button variant="ghost" size="icon" onClick={resetJobForm}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <p className="text-muted-foreground">Select an existing organization or create a new one:</p>
            
            {organizations && organizations.length > 0 && (
              <div className="grid gap-3">
                {organizations.map(org => (
                  <Button
                    key={org.id}
                    variant="outline"
                    className="justify-start h-auto p-4"
                    onClick={() => setJobOrgId(org.id)}
                  >
                    <div className="flex items-center gap-3">
                      {org.logo_url && (
                        <img src={org.logo_url} alt={org.name} className="w-10 h-10 object-contain rounded" />
                      )}
                      <div className="text-left">
                        <div className="font-medium">{org.name}</div>
                        {org.description && (
                          <div className="text-xs text-muted-foreground line-clamp-1">{org.description}</div>
                        )}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            )}

            <div className="pt-4 border-t">
              <Button onClick={handleAddNewOrg} variant="secondary" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Create New Organization
              </Button>
            </div>

            <Button variant="ghost" onClick={() => setIsPartnerJob(null)} className="w-full">
              ← Back
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Organization form
  if (viewMode === 'org-form') {
    return (
      <Card className="border border-border bg-card text-card-foreground shadow-sm">
        <CardContent className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
              {editingOrgId ? "Edit organization" : "Create partner organization"}
            </h2>
            <Button variant="ghost" size="icon" onClick={resetOrgForm}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="org-name">Organization Name *</Label>
              <Input
                id="org-name"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="Enter organization name"
              />
            </div>

            <div>
              <Label htmlFor="org-logo">Organization Logo</Label>
              <Input
                id="org-logo"
                type="file"
                accept="image/*"
                onChange={handleOrgLogoUpload}
                disabled={uploadingOrgLogo}
              />
              {uploadingOrgLogo && <p className="text-sm text-muted-foreground mt-1">Uploading...</p>}
              {orgLogoUrl && !uploadingOrgLogo && (
                <div className="mt-2 flex items-center gap-2">
                  <img src={orgLogoUrl} alt="Logo preview" className="w-16 h-16 object-contain rounded border" />
                  <span className="text-sm text-primary">✓ Logo uploaded</span>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="org-description">Organization Description</Label>
              <Input
                id="org-description"
                value={orgDescription}
                onChange={(e) => setOrgDescription(e.target.value)}
                placeholder="Brief description of the organization"
              />
            </div>

            <div>
              <Label htmlFor="org-website">Website URL *</Label>
              <Input
                id="org-website"
                type="url"
                value={orgWebsiteUrl}
                onChange={(e) => setOrgWebsiteUrl(e.target.value)}
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={resetOrgForm}>Cancel</Button>
            <Button
              onClick={() => saveOrgMutation.mutate()}
              disabled={!orgName || !orgWebsiteUrl || saveOrgMutation.isPending}
            >
              {saveOrgMutation.isPending ? "Saving..." : (editingOrgId ? "Update Organization" : "Create Organization")}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Job details form
  if (viewMode === 'job-form') {
    const selectedOrg = organizations?.find(org => org.id === jobOrgId);
    
    return (
      <Card className="border border-border bg-card text-card-foreground shadow-sm">
        <CardContent className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
                {editingJobId ? "Edit job opening" : "Create job opening"}
              </h2>
              {selectedOrg && (
                <p className="text-sm text-muted-foreground mt-1">
                  For: {selectedOrg.name}
                </p>
              )}
              {!jobOrgId && (
                <p className="text-sm text-primary mt-1">
                  Direct QAPilot Position
                </p>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={resetJobForm}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="job-role">Role / Title *</Label>
              <Input
                id="job-role"
                value={jobRole}
                onChange={(e) => {
                  setJobRole(e.target.value);
                  // Auto-generate slug when typing (always sync unless manually edited)
                  if (!editingJobId) {
                    setJobSlug(generateSlug(e.target.value));
                  }
                }}
                placeholder="e.g., Senior QA Engineer"
              />
            </div>

            <div>
              <Label htmlFor="job-slug">URL Slug *</Label>
              <Input
                id="job-slug"
                value={jobSlug}
                onChange={(e) => setJobSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                placeholder="e.g., senior-qa-engineer"
              />
              <p className="text-xs text-muted-foreground mt-1">
                URL: {SITE_DOMAIN}/careers/{jobSlug || 'your-slug'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="job-department">Department *</Label>
                <Input
                  id="job-department"
                  value={jobDepartment}
                  onChange={(e) => setJobDepartment(e.target.value)}
                  placeholder="e.g., Engineering"
                />
              </div>

              <div>
                <Label htmlFor="job-location">Location *</Label>
                <Input
                  id="job-location"
                  value={jobLocation}
                  onChange={(e) => setJobLocation(e.target.value)}
                  placeholder="e.g., Remote, Hyderabad"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="job-type">Employment Type *</Label>
              <Select
                value={jobEmploymentType}
                onValueChange={(value: 'full_time' | 'part_time' | 'internship') => setJobEmploymentType(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select employment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full_time">Full-time</SelectItem>
                  <SelectItem value="part_time">Part-time</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="h-[400px] flex flex-col">
              <Label className="mb-2">Job Description *</Label>
              <div className="flex-1 overflow-hidden">
                <RichTextEditor
                  value={jobDescription}
                  onChange={setJobDescription}
                  placeholder="Describe the role, responsibilities, requirements..."
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="job-published"
                checked={jobPublished}
                onCheckedChange={(checked) => setJobPublished(checked as boolean)}
              />
              <Label htmlFor="job-published">Published (visible on careers page)</Label>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={resetJobForm}>Cancel</Button>
            <Button
              onClick={() => saveJobMutation.mutate()}
              disabled={!jobRole || !jobSlug || !jobDepartment || !jobLocation || !jobDescription || saveJobMutation.isPending}
            >
              {saveJobMutation.isPending ? "Saving..." : (editingJobId ? "Update Job" : "Create Job")}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // List view
  return (
    <div className="space-y-6">
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={handleAddNewOrg}>
          <Building2 className="w-4 h-4 mr-2" />
          New Organization
        </Button>
        <Button onClick={handleAddNewJob}>
          <Plus className="w-4 h-4 mr-2" />
          New Job Opening
        </Button>
      </div>

      {/* QAPilot Direct Jobs */}
      <Card className="border border-border bg-card text-card-foreground shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" />
            QAPilot Direct Positions
            <span className="text-sm font-normal text-muted-foreground">
              ({qapilotJobs.length} job{qapilotJobs.length !== 1 ? 's' : ''})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {qapilotJobs.length > 0 ? (
            <div className="space-y-3">
              {qapilotJobs.map(job => (
                <div key={job.id} className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{job.role}</h4>
                      {job.published ? (
                        <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">Published</span>
                      ) : (
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">Draft</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {job.department} • {job.location} • {getEmploymentTypeLabel(job.employment_type)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEditJob(job)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => deleteJobMutation.mutate(job.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">No direct QAPilot positions yet.</p>
          )}
        </CardContent>
      </Card>

      {/* Partner Organizations with Jobs */}
      <Card className="border border-border bg-card text-card-foreground shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Partner Organizations
            <span className="text-sm font-normal text-muted-foreground">
              ({organizations?.length || 0} organization{(organizations?.length || 0) !== 1 ? 's' : ''})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {organizations && organizations.length > 0 ? (
            <div className="space-y-3">
              {organizations.map(org => {
                const orgJobs = orgJobsMap.get(org.id) || [];
                const isExpanded = expandedOrgs.has(org.id);
                
                return (
                  <Collapsible key={org.id} open={isExpanded} onOpenChange={() => toggleOrgExpanded(org.id)}>
                    <div className="border rounded-lg">
                      <div className="flex justify-between items-center p-4 bg-muted/30">
                        <CollapsibleTrigger className="flex items-center gap-3 flex-1 text-left">
                          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                          {org.logo_url && (
                            <img src={org.logo_url} alt={org.name} className="w-10 h-10 object-contain rounded" />
                          )}
                          <div>
                            <h4 className="font-medium">{org.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {orgJobs.length} job{orgJobs.length !== 1 ? 's' : ''}
                            </p>
                          </div>
                        </CollapsibleTrigger>
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon" onClick={() => handleEditOrg(org)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="icon" 
                            onClick={() => deleteOrgMutation.mutate(org.id)}
                            disabled={orgJobs.length > 0}
                            title={orgJobs.length > 0 ? "Delete all jobs first" : "Delete organization"}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <CollapsibleContent>
                        <div className="p-4 pt-0 space-y-2">
                          {orgJobs.length > 0 ? (
                            orgJobs.map(job => (
                              <div key={job.id} className="flex justify-between items-center p-3 bg-background rounded-lg border">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h5 className="font-medium text-sm">{job.role}</h5>
                                    {job.published ? (
                                      <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">Published</span>
                                    ) : (
                                      <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">Draft</span>
                                    )}
                                  </div>
                                  <p className="text-xs text-muted-foreground">
                                    {job.department} • {job.location} • {getEmploymentTypeLabel(job.employment_type)}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm" onClick={() => handleEditJob(job)}>
                                    <Edit className="w-3 h-3" />
                                  </Button>
                                  <Button variant="destructive" size="sm" onClick={() => deleteJobMutation.mutate(job.id)}>
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-muted-foreground text-center py-2">No jobs for this organization.</p>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full mt-2"
                            onClick={() => {
                              setJobOrgId(org.id);
                              setIsPartnerJob(true);
                              setViewMode('job-form');
                            }}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Job to {org.name}
                          </Button>
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                );
              })}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">No partner organizations yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CareersCMS;
