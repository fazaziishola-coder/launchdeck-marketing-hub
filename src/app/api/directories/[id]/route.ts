import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { status, submissionUrl, notes } = body;

    const dataToUpdate: any = {};
    if (status !== undefined) {
      dataToUpdate.status = status;
      if (status === 'SUBMITTED' || status === 'APPROVED') {
        dataToUpdate.submittedAt = new Date();
      }
    }
    if (submissionUrl !== undefined) dataToUpdate.submissionUrl = submissionUrl;
    if (notes !== undefined) dataToUpdate.notes = notes;

    const updated = await db.directorySubmission.update({
      where: { id: params.id },
      data: dataToUpdate,
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update directory submission', details: String(error) }, { status: 500 });
  }
}
