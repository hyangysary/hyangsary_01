'use client';

import React, { useState } from 'react';

const EDU_QUESTIONS = {
  parents: [
    { id: 'p1', text: '학원·과외를 아무리 밀어줘도 아이의 학습 능률과 성적이 오르지 않는다.' },
    { id: 'p2', text: '조금만 더 집중하면 좋겠는데, 아이가 스스로 책상에 앉으려 하지 않는다.' },
    { id: 'p3', text: '전적으로 지원하고 있고 열심히 하는 것 같으나, 실질적인 결과가 만족스럽지 못하다.' },
    { id: 'p4', text: '주입식 공부에서 벗어나 스스로 계획하고 끝내는 진짜 힘을 길러주고 싶다.' },
  ],
  teachers: [
    { id: 't1', text: '열심히 가르쳐도 학생들의 흡수율과 성적 향상 속도에 한계를 느낀다.' },
    { id: 't2', text: '단순 티칭을 넘어 아이들 스스로 몰입하게 만드는 효율적인 코칭 솔루션을 찾고 있다.' },
    { id: 't3', text: '학부모 상담 시 학생의 학습 습관과 메타인지를 입증할 객관적 시스템이 필요하다.' },
  ],
  students: [
    { id: 's1', text: '남들만큼, 혹은 그 이상 열심히 책상에 앉아 있는데도 결과가 만족스럽지 못하다.' },
    { id: 's2', text: '어떻게 공부해야 지금보다 확실히 더 나은 결과가 나오는지 구체적 방법을 알고 싶다.' },
    { id: 's3', text: '학원에 끌려다니지 않고 진짜 혼자 힘으로 성적을 뒤집는 자기주도학습이 가능한지 확인하고 싶다.' },
  ],
};

const SCALE_LABELS = [
  { score: 5, label: '매우 원한다' },
  { score: 4, label: '원한다' },
  { score: 3, label: '그저 그렇다' },
  { score: 2, label: '원하지 않는다' },
  { score: 1, label: '전혀 아니다' },
];

export default function HyanggisariMain() {
  const [activeTrack, setActiveTrack] = useState<'none' | 'edu' | 'consulting'>('none');
  const [eduRole, setEduRole] = useState<'parents' | 'teachers' | 'students' | null>(null);
  const [eduScores, setEduScores] = useState<Record<string, number>>({});
  const [eduCompleted, setEduCompleted] = useState(false);

  const [consultFields, setConsultFields] = useState<string[]>([]);
  const [severity, setSeverity] = useState<number>(3);
  const [solutionScope, setSolutionScope] = useState<number>(3);
  const [consultForm, setConsultForm] = useState({ company: '', name: '', contact: '', note: '' });
  const [consultSubmitted, setConsultSubmitted] = useState(false);

  const handleScoreChange = (qId: string, score: number) => {
    setEduScores((prev) => ({ ...prev, [qId]: score }));
  };

  const toggleField = (field: string) => {
    setConsultFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const handleGoToJagijudo = () => {
    const roleParam = eduRole || 'all';
    window.location.href = `https://jagijudo.com?from=hyanggisari&role=${roleParam}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="border-b bg-white sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-2xl tracking-tight text-indigo-950">(주)향기살이</span>
            <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-semibold">HQ</span>
          </div>
          <nav className="flex space-x-3 text-sm font-medium">
            <button
              onClick={() => { setActiveTrack('edu'); setEduRole(null); setEduCompleted(false); }}
              className={`px-3 py-1.5 rounded-lg transition ${activeTrack === 'edu' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              자기주도 교육솔루션
            </button>
            <button
              onClick={() => { setActiveTrack('consulting'); setConsultSubmitted(false); }}
              className={`px-3 py-1.5 rounded-lg transition ${activeTrack === 'consulting' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              한컨설팅 자문
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <section className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
            사람의 역량을 깨우고, 기업의 내일을 설계합니다
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            (주)향기살이는 스스로 학습하는 교육 솔루션과 기업 현안을 해결하는 경영 자문을 제공합니다.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div
            onClick={() => { setActiveTrack('edu'); setEduCompleted(false); }}
            className={`cursor-pointer rounded-2xl p-7 border-2 transition-all shadow-sm hover:shadow-md ${
              activeTrack === 'edu' ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-200' : 'border-slate-200 bg-white hover:border-indigo-300'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-100 px-2.5 py-1 rounded-full">
                Track 01. Education
              </span>
              <span className="text-sm font-semibold text-indigo-600">진단 시작 →</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">효능 자기주도학습 솔루션</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              학부모, 선생님, 학생 각자의 자리에서 마주한 학습 정체와 고민을 진단하고 진짜 자기주도로 나아가는 해법을 확인하세요.
            </p>
          </div>

          <div
            onClick={() => { setActiveTrack('consulting'); setConsultSubmitted(false); }}
            className={`cursor-pointer rounded-2xl p-7 border-2 transition-all shadow-sm hover:shadow-md ${
              activeTrack === 'consulting' ? 'border-slate-800 bg-slate-900/5 ring-2 ring-slate-300' : 'border-slate-200 bg-white hover:border-slate-400'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-200 px-2.5 py-1 rounded-full">
                Track 02. Consulting
              </span>
              <span className="text-sm font-semibold text-slate-800">기초 자문 신청 →</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">한컨설팅 기업 경영 자문</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              재정·회계·법무·노무·인사 등 현재 기업이 직면한 문제의 심각도와 요구 수준에 맞춰 맞춤형 솔루션을 제안합니다.
            </p>
          </div>
        </div>

        {activeTrack === 'edu' && (
          <section className="bg-white border rounded-2xl p-6 md:p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              [교육 솔루션] 현재 당신의 위치는 어디입니까?
            </h3>
            <div className="grid grid-cols-3 gap-3 mb-8 mt-4">
              {[
                { key: 'parents', label: '학부모', desc: '자녀 지원 & 능률 고민' },
                { key: 'teachers', label: '선생님 · 교육자', desc: '효율적인 코칭 대안' },
                { key: 'students', label: '학생 · 학습자', desc: '노력 대비 결과 갈증' },
              ].map((role) => (
                <button
                  key={role.key}
                  type="button"
                  onClick={() => { setEduRole(role.key as any); setEduCompleted(false); setEduScores({}); }}
                  className={`p-4 rounded-xl border text-left transition ${
                    eduRole === role.key ? 'border-indigo-600 bg-indigo-50 font-bold text-indigo-900 ring-1 ring-indigo-500' : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-base font-semibold">{role.label}</div>
                  <div className="text-xs text-slate-500 mt-1">{role.desc}</div>
                </button>
              ))}
            </div>

            {eduRole && !eduCompleted && (
              <div className="space-y-6 border-t pt-6">
                {EDU_QUESTIONS[eduRole].map((q, idx) => (
                  <div key={q.id} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="font-medium text-slate-800 text-sm md:text-base mb-3">
                      {idx + 1}. {q.text}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {SCALE_LABELS.map((scale) => (
                        <button
                          key={scale.score}
                          type="button"
                          onClick={() => handleScoreChange(q.id, scale.score)}
                          className={`py-2 px-2 text-xs rounded-lg border transition ${
                            eduScores[q.id] === scale.score
                              ? 'bg-indigo-600 text-white border-indigo-600 font-semibold'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {scale.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setEduCompleted(true)}
                  disabled={Object.keys(eduScores).length < EDU_QUESTIONS[eduRole].length}
                  className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-40 transition"
                >
                  진단 결과 분석 및 매칭 확인하기
                </button>
              </div>
            )}

            {eduCompleted && (
              <div className="border-t pt-6">
                <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8">
                  <h4 className="text-xl md:text-2xl font-bold mb-3">
                    "단순한 공부 시간 문제가 아닌, 스스로 지휘하는 시스템의 부재입니다."
                  </h4>
                  <p className="text-slate-300 text-sm md:text-base mb-6 leading-relaxed">
                    입력 위주의 주입식 교육은 한계가 있습니다. 검증된 효능 자기주도학습 솔루션으로 해결 루틴을 제시해 드립니다.
                  </p>
                  <div className="bg-white/10 rounded-xl p-4 border border-white/10 mb-6 text-sm text-indigo-200">
                    💡 자기주도학습 메인 플랫폼(jagijudo.com)과 연결하여 구체적인 해결 프로세스를 한번 훑어보시겠습니까?
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleGoToJagijudo}
                      className="flex-1 py-3.5 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-xl transition"
                    >
                      네, 연결해서 훑어보겠습니다 (jagijudo.com 이동) →
                    </button>
                    <button
                      type="button"
                      onClick={() => setEduCompleted(false)}
                      className="py-3.5 px-6 border border-white/20 text-slate-300 rounded-xl"
                    >
                      다시 진단
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {activeTrack === 'consulting' && (
          <section className="bg-white border rounded-2xl p-6 md:p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              한컨설팅 전문 자문을 위한 기초 상황 자료
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              기업의 당면 과제 분야와 심각도를 남겨주시면 대표 컨설턴트가 사전 분석 후 맞춤형 대안을 제시합니다.
            </p>

            {!consultSubmitted ? (
              <form onSubmit={(e) => { e.preventDefault(); setConsultSubmitted(true); }} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">1. 지원이 필요한 분야 (복수 선택)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['재정/자금', '회계/세무', '법무/계약', '노무/인사', '공공입찰/조달', '원가분석', '브랜딩/UI', '경영현안'].map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => toggleField(f)}
                        className={`py-2 px-3 rounded-lg border text-xs font-semibold ${
                          consultFields.includes(f) ? 'bg-slate-900 text-white' : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">2. 현재 당면 문제 심각도 (선택: {severity}단계)</label>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSeverity(s)}
                        className={`py-2 rounded-lg border text-xs font-bold ${
                          severity === s ? 'bg-slate-900 text-white' : 'bg-white border-slate-200'
                        }`}
                      >
                        {s}단계
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">3. 희망 솔루션 범위 (선택: Level {solutionScope})</label>
                  <div className="grid grid-cols-5 gap-2">
                    {['1. 인지', '2. 방향', '3. 해소', '4. 단기관리', '5. 장기관리'].map((lvl, idx) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setSolutionScope(idx + 1)}
                        className={`py-2 rounded-lg border text-xs font-bold ${
                          solutionScope === idx + 1 ? 'bg-indigo-950 text-white' : 'bg-white border-slate-200'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">회사명</label>
                    <input
                      type="text"
                      required
                      value={consultForm.company}
                      onChange={(e) => setConsultForm({ ...consultForm, company: e.target.value })}
                      className="w-full text-sm px-3 py-2 border rounded-lg bg-white"
                      placeholder="(주)향기살이 파트너스"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">연락처</label>
                    <input
                      type="tel"
                      required
                      value={consultForm.contact}
                      onChange={(e) => setConsultForm({ ...consultForm, contact: e.target.value })}
                      className="w-full text-sm px-3 py-2 border rounded-lg bg-white"
                      placeholder="010-0000-0000"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={consultFields.length === 0}
                  className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl disabled:opacity-40"
                >
                  기초 자문 요청서 제출하기
                </button>
              </form>
            ) : (
              <div className="text-center py-10 bg-slate-50 rounded-2xl border">
                <h4 className="text-xl font-bold text-slate-900 mb-2">기초 자문 요청이 정상 접수되었습니다.</h4>
                <p className="text-sm text-slate-600">남겨주신 연락처로 24시간 이내에 1차 가이드라인을 회신드리겠습니다.</p>
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="border-t bg-white mt-20 py-8 text-xs text-slate-500 text-center">
        (주)향기살이 | 한컨설팅 | 교육사업부 (jagijudo.com)
      </footer>
    </div>
  );
}