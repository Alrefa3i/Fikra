import React from 'react'

function Description() {
    return (
        <div className='' style={{ direction: "rtl" }}>
            <h2 className="card-title ">الوصف</h2>
            <div className='text-sm'>
                <p className="text-lg leading-relaxed">
                    هذه الدورة هي دليلك الشامل لتحويل أفكار التصميم من المخطط الرقمي إلى موقع ويب متكامل وجاهز للنشر! ستتعلم خطوة بخطوة كيفية استخدام Figma لتصميم واجهات احترافية، ثم تحويلها بسهولة إلى موقع ديناميكي باستخدام Webflow، دون الحاجة إلى خبرة في البرمجة.
                </p>

                <h2 className="text-xl font-semibold  mt-4" style={{ color: "#ff6636" }}>ما الذي ستتعلمه في هذه الدورة؟</h2>
                <ul className="list-disc list-inside space-y-2 pl-4 text-gray-700">
                    <li><span className="font-medium text-yellow-600">تصميم الواجهات باستخدام Figma:</span> تعلم كيفية إنشاء تصاميم متجاوبة وجذابة تناسب جميع الأجهزة.</li>
                    <li><span className="font-medium text-yellow-600">بناء المواقع على Webflow:</span> ستتعرف على أساسيات Webflow وأدواته القوية، مما يتيح لك تحويل التصاميم إلى مواقع حقيقية.</li>
                    <li><span className="font-medium text-yellow-600">تحسين تجربة المستخدم (UX) والتجاوب (Responsive Design):</span> ضمان أن يعمل الموقع بسلاسة على مختلف الشاشات (أجهزة الكمبيوتر، الهواتف، والأجهزة اللوحية).</li>
                    <li><span className="font-medium text-yellow-600">النشر وإدارة الموقع:</span> كيفية نشر موقعك الإلكتروني عبر Webflow وإدارته بفعالية بعد الإطلاق.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-4 py-2" style={{ color: "#ff6636" }}>مميزات الدورة</h2>
                <ul className="list-disc list-inside space-y-2 pl-4 text-gray-700">
                    <li><span className="font-medium text-yellow-600">من النظرية إلى التطبيق:</span> تبدأ بالتخطيط والتصميم في Figma وتنتقل إلى التنفيذ في Webflow، حتى يصبح موقعك متاحًا للجمهور.</li>
                    <li><span className="font-medium text-yellow-600">دورة تفاعلية وعملية:</span> تطبيقات واقعية مع مشاريع عملية تتيح لك تطبيق ما تعلمته في الوقت الفعلي.</li>
                    <li><span className="font-medium text-yellow-600">مناسبة لجميع المستويات:</span> سواء كنت مبتدئًا أو لديك بعض الخبرة، ستتمكن من المتابعة وتطوير مهاراتك.</li>
                </ul>

                <p className=" leading-relaxed mt-4">
                    في نهاية هذه الدورة، ستكون قادرًا على تصميم وبناء مواقع ويب احترافية ومتجاوبة بالكامل باستخدام أدوات حديثة دون الحاجة إلى أي مهارات برمجية معقدة. انضم الآن واستعد لدخول عالم تصميم الويب بثقة!
                </p>
            </div>
        </div>
    )
}

export default Description